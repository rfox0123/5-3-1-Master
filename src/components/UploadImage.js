import React from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';
import { firebaseDb } from '../server/firebase';
import { filestackDb } from '../server/filestack';

const UploadImage = props => {
  const renderPicker = () => {
    if (props.type === 'profile') {
      const ratio = 1 / 1;
      filestackDb
        .pick({
          transformations: {
            crop: {
              aspectRatio: ratio,
              force: true
            }
          }
        })
        .then(function(response) {
          const imageUrl = response.filesUploaded[0].url;

          const date = Date();

          firebaseDb
            .ref('users/' + props.userId)
            .push({
              profileImage: imageUrl,
              date: date
            })
            .then(() => {
              props.fetchProfileImage(props.userId);
            });
        });
    } else if (props.type === 'other') {
      filestackDb.pick({}).then(function(response) {
        const imageUrl = response.filesUploaded[0].url;

        const date = Date();

        firebaseDb
          .ref('users/' + props.userId)
          .push({
            userImage: imageUrl,
            date: date
          })
          .then(() => {
            props.fetchUserImages(props.userId);
          });
      });
    }
  };

  return (
    <div className="class-name">
      <ButtonToolbar>
        <Button bsSize="small" onClick={() => renderPicker()}>
          {props.caption}
        </Button>
      </ButtonToolbar>
    </div>
  );
};

export default UploadImage;
