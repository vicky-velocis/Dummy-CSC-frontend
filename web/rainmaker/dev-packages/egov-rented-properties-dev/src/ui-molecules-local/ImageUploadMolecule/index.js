import React, { Component } from "react";
import ImageUpload from "egov-ui-kit/common/common/ImageUpload";


class ImageUploadMolecule extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { formKey, imageLength, MAX_IMAGE_SIZE } = this.props;
    return (
        <div>
        <ImageUpload module="egov-rented-properties" formKey={formKey} imageLength={imageLength} MAX_IMAGE_SIZE={MAX_IMAGE_SIZE} fieldKey="media" />
      </div>
        );
  }
}
export default ImageUploadMolecule;