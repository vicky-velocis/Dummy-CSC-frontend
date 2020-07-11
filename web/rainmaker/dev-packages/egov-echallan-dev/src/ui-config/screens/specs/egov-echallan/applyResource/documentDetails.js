import {
  getBreak,
  getCommonCard,
  getCommonParagraph,
  getCommonTitle
} from "egov-ui-framework/ui-config/screens/specs/utils";


export const documentDetails = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Required Documents",
      labelKey: "EC_DOCUMENT_DETAILS_HEADER_POPUP"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),
  subText: getCommonParagraph({
    labelName:
      "Only one file can be uploaded for one document. If multiple files need to be uploaded then please combine all files in a pdf and then upload",
    labelKey: "EC_VIOLATION_UPLOAD_SUBHEAD"
  }),
  upload: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: {
        marginLeft: 8
      }
    },
    required: true,
    children: {
      subText_format: getCommonParagraph(
        {
          labelName: "Only .jpg and .pdf files. 1MB max file size.",
          labelKey: "EC_VIOLATION_SINGLE_UPLOAD_SUBHEAD"
        },
        {
          style: {
            fontSize: 12,
            marginBottom: 0,
            marginTop: 5,
            width: "100%",
            color: "rgba(0, 0, 0, 0.6000000238418579)"
          }
        }
      ),
      
    }
  },
  break: getBreak(),
  documentList: {
    uiFramework: "custom-containers-local",
    moduleName: "egov-echallan",
    componentPath: "DocumentListContainer",
    required: true,
    props: {
      buttonLabel: {
        labelName: "UPLOAD FILE",
        labelKey: "EC_DOCUMENT_DETAILS_BUTTON_UPLOAD_FILE"
      },
      description: "Only .jpg and .pdf files. 1 MB max file size.",
      inputProps: {
        accept: ".pdf,.png,.jpeg"
      },
      maxFileSize: 1000
    },
    type: "array"
  },

});

export const violationDocumentDetails = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Required Documents",
      labelKey: "EC_DOCUMENT_DETAILS_VIOLATION_HEADER_POPUP"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),
  subText: getCommonParagraph({
    labelName:
      "Only one file can be uploaded for one document. If multiple files need to be uploaded then please combine all files in a pdf and then upload",
    labelKey: "EC_VIOLATION_UPLOAD_SUBHEAD"
  }),
  break: getBreak(),
  upload: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: {
        marginLeft: 8
      }
    },
    required: true,
    children: {
      uploadFileInfo: getCommonParagraph(
        {
          labelName: "Only .jpg and .pdf files. 5MB max file size.",
          labelKey: "EC_VIOLATION_BULK_UPLOAD_SUBHEAD"
        },
        {
          style: {
            fontSize: 12,
            marginBottom: 0,
            marginTop: 5,
            width: "100%",
            color: "rgba(0, 0, 0, 0.6000000238418579)"
          }
        }
      ),
      uploadButton: {
        uiFramework: "custom-molecules",
        moduleName: "egov-echallan",
        componentPath: "UploadMultipleFiles",
        props: {
          maxFiles: 5,
          jsonPath: "violationDocuments",
          inputProps: {
            accept: "image/*, .pdf, .png, .jpeg"
          },
          buttonLabel: {
            labelName: "UPLOAD FILES",
            labelKey: "EC_VIOLATION_UPLOAD_FILES_BUTTON_LABEL"
          },
          maxFileSize: 5000,
          moduleName: "egov-echallan",
          required:true,
          hasLocalization: true,
        }
      }
    }
  }


});
