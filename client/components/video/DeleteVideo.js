import React, { useState } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import { 
  IconButton, 
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import auth from "../../utils/auth-helper";
import { remove } from "../../api/api-media.js";

export default function DeleteVideo(props) {
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const jwt = auth.isAuthenticated();

  const clickButton = () => {
    setOpen(true);
  };

  const deleteMedia = () => {
    remove(
      {
        mediaId: props.mediaId,
      },
      { t: jwt.token }
    ).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRedirect(true);
      }
    });
  };

  const handleRequestClose = () => {
    setOpen(false);
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <span>
      <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
        <DeleteIcon />
      </IconButton>

      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{"Delete " + props.mediaTitle}</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Confirm to delete {props.mediaTitle} from your account.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          
          <Button
            onClick={deleteMedia}
            variant="contained"
            color="secondary"
            autoFocus="autoFocus"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}

DeleteMedia.propTypes = {
  mediaId: PropTypes.string.isRequired,
  mediaTitle: PropTypes.string.isRequired,
};
