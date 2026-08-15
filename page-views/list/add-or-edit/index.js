'use client';


import { useState, useEffect } from 'react';
import useQueryRouter from 'utils/hooks/useQueryRouter';
import PageTitle from 'components/PageTitle';

import Header from 'parts/Header';
import NotFound from 'parts/NotFound';
import PageWrapper from 'parts/PageWrapper';
import PaddingWrapper from 'parts/PaddingWrapper';
import PublicOrPrivateSelectSearch from 'parts/PublicOrPrivateSelectSearch';
import ListNavigation from 'containers/ListNavigation';
import TextInput from 'components/UI/TextInput';
import TextArea from 'components/UI/TextArea';
import Button from 'components/UI/Button';
import Loader from 'components/UI/Loader';
import Annotation from 'components/Annotation';
import withAuth from 'utils/hocs/withAuth';
import { LIST_VISIBILITY, YES_OR_NO_OPTIONS } from 'utils/constants/select-search';
import { TMDB_API_NEW_VERSION } from 'config/tmdb';
import useForm from 'utils/hooks/useForm';
import INPUT_NAMES from 'utils/constants/input-names';
import QUERY_PARAMS from 'utils/constants/query-params';
import LINKS from 'utils/constants/links';
import STATUSES from 'utils/constants/statuses';
import tmdbAPI from 'services/tmdbAPI';
import getErrorMessage from 'utils/helpers/getErrorMessage';
import sanitizeListDescription from 'utils/helpers/sanitizeListDescription';

const AddOrEdit = ({
  accountId,
  accessToken
}) => {
  const { query, asPath, push, replace } = useQueryRouter();
  const listId = query[QUERY_PARAMS.ID];

  const [editStatus, setEditStatus] = useState(STATUSES.IDLE);
  const [submitStatus, setSubmitStatus] = useState(STATUSES.IDLE);
  const [editError, setEditError] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    if (asPath === LINKS.ADD_OR_EDIT_LIST.HREF) {
      setEditStatus(STATUSES.RESOLVED);
    }
  }, []);

  const submitCallback = async () => {
    try {
      setSubmitStatus(STATUSES.PENDING);
      setSubmitError(null);
      const body = {
        name: inputs[INPUT_NAMES.LIST_NAME],
        description: sanitizeListDescription(inputs[INPUT_NAMES.LIST_DESCRIPTION]),
        public: inputs[INPUT_NAMES.PUBLIC_OR_PRIVATE_LIST] === LIST_VISIBILITY.PUBLIC,
        iso_639_1: 'en'
      };
      const config = {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      };

      const response = listId
        ? await tmdbAPI.put(`/${TMDB_API_NEW_VERSION}/list/${listId}`, body, config)
        : await tmdbAPI.post(`/${TMDB_API_NEW_VERSION}/list`, body, config);

      setSubmitStatus(STATUSES.RESOLVED);

      if (!listId) {
        const { id } = response.data;
        push({
          query: {
            [QUERY_PARAMS.ID]: id
          }
        });
      }
    } catch (error) {
      setSubmitStatus(STATUSES.REJECTED);
      setSubmitError(getErrorMessage(error, 'We could not save this list. Check the name and description, then try again.'));
    }
  };

  const {
    inputs,
    inputChangeHandler,
    updateInputsHandler,
    onSubmitHandler
  } = useForm({
    submitCallback,
    initialInputs: {
      [INPUT_NAMES.LIST_NAME]: '',
      [INPUT_NAMES.LIST_DESCRIPTION]: '',
      [INPUT_NAMES.PUBLIC_OR_PRIVATE_LIST]: LIST_VISIBILITY.PUBLIC
    }
  });

  const publicOrPrivateSelectHandler = newIsPublicList => {
    inputChangeHandler({
      target: {
        name: INPUT_NAMES.PUBLIC_OR_PRIVATE_LIST,
        value: newIsPublicList
      }
    });
  };

  useEffect(() => {
    (async () => {
      if (!listId) return;
      if (!accessToken) return;
      if (!accountId) return;

      try {
        setEditStatus(STATUSES.PENDING);
        const config = {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        };
        const response = await tmdbAPI.get(`/${TMDB_API_NEW_VERSION}/list/${listId}`, config);
        const movies = response.data;
        if (movies.created_by.id === accountId) {
          updateInputsHandler({
            [INPUT_NAMES.LIST_NAME]: movies.name,
            [INPUT_NAMES.LIST_DESCRIPTION]: movies.description,
            [INPUT_NAMES.PUBLIC_OR_PRIVATE_LIST]: movies.public
              ? LIST_VISIBILITY.PUBLIC
              : LIST_VISIBILITY.PRIVATE
          });
        } else {
          throw new Error('You do not have permission to edit this list.');
        }
      } catch (error) {
        setEditStatus(STATUSES.REJECTED);
        setEditError(error);
      }
    })();
  }, [listId, updateInputsHandler, accessToken, accountId]);

  const listName = inputs[INPUT_NAMES.LIST_NAME];

  useEffect(() => {
    if (!listName) return;

    setEditStatus(STATUSES.RESOLVED);
  }, [listName]);

  if (editStatus === STATUSES.IDLE || editStatus === STATUSES.PENDING) {
    return <Loader />;
  }

  if (editStatus === STATUSES.REJECTED) {
    return (
      <NotFound
        title='Unable to edit this list'
        subtitle={getErrorMessage(editError, 'You do not have permission to edit this list, or it could not be found.')} />
    );
  }

  if (editStatus === STATUSES.RESOLVED) {
    return (
      <>
        <PageTitle>{listId ? listName : 'Create New List: Step1'}</PageTitle>
        <PageWrapper>
          <PaddingWrapper>
            <Header
              title={listId ? listName : 'Create New List: Step1'}
              subtitle='Edit' />
            <ListNavigation listId={listId} />
            <form onSubmit={onSubmitHandler}>
              <TextInput
                id='name'
                label='Name'
                name={INPUT_NAMES.LIST_NAME}
                value={inputs[INPUT_NAMES.LIST_NAME]}
                onChange={inputChangeHandler}
                required />
              <TextArea
                id='description'
                label='Description'
                name={INPUT_NAMES.LIST_DESCRIPTION}
                value={inputs[INPUT_NAMES.LIST_DESCRIPTION]}
                onChange={inputChangeHandler} />
              <PublicOrPrivateSelectSearch
                id='public-or-private-select'
                label='Public List?'
                name={INPUT_NAMES.PUBLIC_OR_PRIVATE_LIST}
                value={inputs[INPUT_NAMES.PUBLIC_OR_PRIVATE_LIST]}
                onChange={publicOrPrivateSelectHandler}
                options={YES_OR_NO_OPTIONS} />
              {submitError && (
                <Annotation style={{marginTop: 24, color: 'var(--palette-error-main, #f44336)'}}>
                  {submitError}
                </Annotation>
              )}
              <Button
                style={{
                  width: 138,
                  marginTop: 48
                }}
                loading={submitStatus === STATUSES.PENDING}
                contained
                type='submit'
                title={listId ? 'Save' : 'Continue'} />
            </form>
          </PaddingWrapper>
        </PageWrapper>
      </>
    );
  }
};

export default withAuth(AddOrEdit);
