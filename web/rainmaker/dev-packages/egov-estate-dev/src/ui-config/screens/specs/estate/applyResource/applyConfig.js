import {
  getStepperObject,
  getCommonCard,
  getCommonTitle,
  getCommonParagraph
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  propertyDetails
} from './propertyDetails';
import {
  ownerDetails
} from './ownerDetails';
import {
  purchaserDetails
} from './purchaserDetails';
import {
  courtCaseDetails
} from './courtCaseDetails';
import {
  paymentDetails
} from './paymentDetails';
import {
  reviewDetails
} from './reviewDetails';
import {
  documentList
} from './documentList'

const documentCardConfig = {
  header: getCommonTitle({
    labelName: "Required Documents",
    labelKey: "EST_UPLOAD_DOCS_HEADER"
  }, {
    style: {
      marginBottom: 18
    }
  }),
  paragraph: getCommonParagraph({
    labelName: "Only one file can be uploaded for one document. If multiple files need to be uploaded then please combine all files in a pdf and then upload",
    labelKey: "EST_UPLOAD_DOCS_SUBHEADER"
  }),
}

export const ownerDocumentDetails = getCommonCard({
  ...documentCardConfig,
  documentList: {
    ...documentList,
    props: {
      ...documentList.props,
      documentsJsonPath: "PropertiesTemp[0].applicationDocuments",
      uploadedDocumentsJsonPath: "PropertiesTemp[0].uploadedDocsInRedux",
      tenantIdJsonPath: "Properties[0].tenantId",
      removedJsonPath: "PropertiesTemp[0].removedDocs"
    }
  }
});

export const getOwnerDocumentDetails = (owner) => {
  return getCommonCard({
    ...documentCardConfig,
    documentList: {
      ...documentList,
      props: {
        ...documentList.props,
        documentsJsonPath: `PropertiesTemp[0].ownerDetails[${owner}].applicationDocuments`,
        uploadedDocumentsJsonPath: `PropertiesTemp[0].ownerDetails[${owner}].uploadedDocsInRedux`,
        tenantIdJsonPath: "Properties[0].tenantId",
        removedJsonPath: `PropertiesTemp[0].ownerDetails[${owner}].removedDocs`
      }
    }
  });
}


export const stepsData = [{
    labelName: "Property Details",
    labelKey: "EST_COMMON_PROPERTY_DETAILS"
  },
  {
    labelName: "Owner & Purchaser Details",
    labelKey: "EST_COMMON_OWNER_PURCHASER_DETAILS"
  },
  {
    labelName: "Court Case",
    labelKey: "EST_COMMON_COURT_CASE_DETAILS"
  },
  {
    labelName: "Payment Details",
    labelKey: "EST_COMMON_PAYMENT_DETAILS"
  },
  {
    labelName: "Documents",
    labelKey: "EST_COMMON_DOCUMENTS"
  },
  {
    labelName: "Summary",
    labelKey: "EST_COMMON_SUMMARY"
  }
];

export const stepper = getStepperObject({
    props: {
      activeStep: 0
    }
  },
  stepsData
);


export const formwizardFirstStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form1"
  },
  children: {
    propertyDetails
  }
};


export const formwizardSecondStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form2"
  },
  children: {
    ownerDetails,
    purchaserDetails
  },
  visible: false
};

export const formwizardThirdStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form3"
  },
  children: {
    courtCaseDetails
  },
  visible: false
};

export const formwizardFourthStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form4"
  },
  children: {
    // paymentDetails
  },
  visible: false
};

export const formwizardFifthStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form5"
  },
  children: {
    // ownerDocumentDetails
  },
  visible: false
};

export const formwizardSixthStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form6"
  },
  children: {
    reviewDetails
  },
  visible: false
}