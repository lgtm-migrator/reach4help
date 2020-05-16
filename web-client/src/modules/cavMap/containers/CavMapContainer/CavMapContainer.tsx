import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ProfileState } from '../../../../ducks/profile/types';
import { observeOpenRequests } from '../../../../ducks/requests/actions';
import { RequestState } from '../../../../ducks/requests/types';
import DummyMapComponent, { LocationProps, MapRequestProps } from './DummyMapComponent';

const CavMapContainer: React.FC = () => {
  const dispatch = useDispatch();

  const [openRequests, setOpenRequests] = useState<MapRequestProps[]>([]);
  const [currentLocation, setCurrentLocation] = useState<LocationProps>({
    lat: 0, lng: 0,
  });

  navigator.geolocation.getCurrentPosition(
    position => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      setCurrentLocation(pos);
    },
    error => {
      // eslint-disable-next-line no-console
      console.error(error.message);
    },
  );

  const requestsState = useSelector(
    ({ requests }: { requests: RequestState }) => requests,
  );

  useEffect(() => {
    if (requestsState.openRequests && requestsState.openRequests.data) {
      const transformedRequests: MapRequestProps[] = [];
      Object.keys(requestsState.openRequests.data || {}).forEach((requestId: string) => {
        if (requestsState.openRequests.data) {
          const request = requestsState.openRequests.data[requestId];
          const mapRequestDetails = {
            center: {
              lat: request.latLng.latitude,
              lng: request.latLng.longitude,
            },
            id: requestId,
          };
          transformedRequests.push(mapRequestDetails);
        }
      });

      setOpenRequests(transformedRequests);
    }
  }, [requestsState]);

  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );

  useEffect(() => {
    if (profileState.profile) {
      return observeOpenRequests(dispatch, {
        userRef: profileState.userRef,
        userType: profileState.profile.applicationPreference,
      });
    }
  }, [profileState, dispatch]);

  return (
    <>
      <DummyMapComponent requests={openRequests} currentLocation={currentLocation} onRequestHandler={() => 'test'} />
    </>
  );
};

CavMapContainer.propTypes = {};

export default CavMapContainer;
