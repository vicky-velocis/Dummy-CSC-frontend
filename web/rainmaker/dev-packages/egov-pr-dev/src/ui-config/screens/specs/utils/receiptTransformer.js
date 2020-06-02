import get from "lodash/get";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import store from "../../../../ui-redux/store";
import { getMdmsData, getReceiptData, getFinancialYearDates } from "../utils";
import {
  getLocalization,
  getLocale
} from "egov-ui-kit/utils/localStorageUtils";
import {
  getUlbGradeLabel,
  getTranslatedLabel,
  transformById,
  getTransformedLocale,
  getUserDataFromUuid
} from "egov-ui-framework/ui-utils/commons";
import { getSearchResults } from "../../../../ui-utils/commons";

const ifNotNull = value => {
  return !["", "NA", "null", null].includes(value);
};

const nullToNa = value => {
  return ["", "NA", "null", null].includes(value) ? "NA" : value;
};

const createAddress = (doorNo, buildingName, street, locality, city) => {
  let address = "";
  address += ifNotNull(doorNo) ? doorNo + ", " : "";
  address += ifNotNull(buildingName) ? buildingName + ", " : "";
  address += ifNotNull(street) ? street + ", " : "";
  address += locality + ", ";
  address += city;
  return address;
};

const epochToDate = et => {
  if (!et) return null;
  var date = new Date(Math.round(Number(et)));
  var formattedDate =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  return formattedDate;
};

export const getMessageFromLocalization = code => {
  let messageObject = JSON.parse(getLocalization("localization_en_IN")).find(
    item => {
      return item.code == code;
    }
  );
  return messageObject ? messageObject.message : code;
};

export const loadUlbLogo = tenantid => {
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = function() {
    var canvas = document.createElement("CANVAS");
    var ctx = canvas.getContext("2d");
    canvas.height = this.height;
    canvas.width = this.width;
    ctx.drawImage(this, 0, 0);
    store.dispatch(
      prepareFinalObject("base64UlbLogoForPdf", canvas.toDataURL())
    );
    canvas = null;
  };
  img.src = `/pb-egov-assets/${tenantid}/logo.png`;
};

export const loadApplicationData = async (applicationNumber, tenant) => {
  let data = {};
  let queryObject = [
    { key: "tenantId", value: tenant },
    { key: "applicationNumber", value: applicationNumber }
  ];
  let response = await getSearchResults(queryObject);

  if (response && response.PublicRelations && response.PublicRelations.length > 0) {
    data.applicationNumber = nullToNa(
      get(response, "PublicRelations[0].PublicRelationDetails.applicationNumber", "NA")
    );
    data.applicationStatus = get(response, "PublicRelations[0].PublicRelationDetails.status");
    data.applicationDate = nullToNa(
      epochToDate(
        get(response, "PublicRelations[0].PublicRelationDetails.applicationDate", "NA")
      )
    );
    data.applicationMode = getMessageFromLocalization(
      nullToNa(get(response, "PublicRelations[0].PublicRelationDetails.channel", "NA"))
    );
    data.nocType = nullToNa(
      get(response, "PublicRelations[0].PublicRelationDetails.PublicRelationType", "NA")
    );
    data.provisionalNocNumber = nullToNa(
      get(response, "PublicRelations[0].provisionPublicRelationNumber", "NA")
    );
    data.PRStationId = nullToNa(
      getMessageFromLocalization(
        `PublicRelation_PRSTATIONS_${getTransformedLocale(
          get(response, "PublicRelations[0].PublicRelationDetails.PRstationId", "NA")
        )}`
      )
    );

    // Certificate Data
    data.PublicRelationNumber = nullToNa(
      get(response, "PublicRelations[0].PublicRelationNumber", "NA")
    );
    data.issuedDate = nullToNa(
      epochToDate(get(response, "PublicRelations[0].PublicRelationDetails.issuedDate", "NA"))
    );
    data.validTo = nullToNa(
      epochToDate(get(response, "PublicRelations[0].PublicRelationDetails.validTo", "NA"))
    );

    // Buildings Data
    data.propertyType = nullToNa(
      get(response, "PublicRelations[0].PublicRelationDetails.noOfBuildings", "NA")
    );
    let buildings = get(response, "PublicRelations[0].PublicRelationDetails.buildings", []);
    data.buildings = buildings.map(building => {
      let uoms = get(building, "uoms", []);
      let uomsObject = {};
      uoms.forEach(uom => {
        uomsObject[uom.code] = uom.value;
      });
      return {
        name: get(building, "name", "NA"),
        usageType: getMessageFromLocalization(
          `PublicRelation_BUILDINGTYPE_${getTransformedLocale(
            get(building, "usageType", "NA").split(".")[0]
          )}`
        ),
        usageSubType: getMessageFromLocalization(
          `PublicRelation_BUILDINGTYPE_${getTransformedLocale(
            get(building, "usageType", "NA")
          )}`
        ),
        uoms: uomsObject
      };
    });

    // Property Location
    data.propertyId = nullToNa(
      get(
        response,
        "PublicRelations[0].PublicRelationDetails.propertyDetails.propertyId",
        "NA"
      )
    );
    data.city = nullToNa(
      getMessageFromLocalization(
        `TENANT_TENANTS_${getTransformedLocale(
          get(
            response,
            "PublicRelations[0].PublicRelationDetails.propertyDetails.address.city",
            "NA"
          )
        )}`
      )
    );
    data.door = nullToNa(
      get(
        response,
        "PublicRelations[0].PublicRelationDetails.propertyDetails.address.doorNo",
        "NA"
      )
    );
    data.buildingName = nullToNa(
      get(
        response,
        "PublicRelations[0].PublicRelationDetails.propertyDetails.address.buildingName",
        "NA"
      )
    );
    data.street = nullToNa(
      get(
        response,
        "PublicRelations[0].PublicRelationDetails.propertyDetails.address.street",
        "NA"
      )
    );
    data.mohalla = nullToNa(
      getMessageFromLocalization(
        `revenue.locality.${getTransformedLocale(
          get(
            response,
            "PublicRelations[0].PublicRelationDetails.propertyDetails.address.locality.code",
            "NA"
          )
        )}`
      )
    );
    data.pincode = nullToNa(
      get(
        response,
        "PublicRelations[0].PublicRelationDetails.propertyDetails.address.pincode",
        "NA"
      )
    );
    data.gis = nullToNa(
      get(
        response,
        "PublicRelations[0].PublicRelationDetails.propertyDetails.address.locality.latitude",
        "NA"
      )
    );
    data.address = createAddress(
      data.door,
      data.buildingName,
      data.street,
      data.mohalla,
      data.city
    );

    // Applicant Details
    let owners = get(
      response,
      "PublicRelations[0].PublicRelationDetails.applicantDetails.owners",
      []
    );
    data.owners = owners.map(owner => {
      return {
        mobile: get(owner, "mobileNumber", "NA"),
        name: get(owner, "name", "NA"),
        gender: get(owner, "gender", "NA"),
        fatherHusbandName: get(owner, "fatherOrHusbandName", "NA"),
        relationship: get(owner, "relationship", "NA"),
        dob: epochToDate(get(owner, "dob", "NA")),
        email: get(owner, "emailId", "NA"),
        pan: get(owner, "pan", "NA"),
        address: get(owner, "correspondenceAddress", "NA")
      };
    });

    // Institution Details
    data.ownershipType = nullToNa(
      get(
        response,
        "PublicRelations[0].PublicRelationDetails.applicantDetails.ownerShipType",
        "NA"
      )
    );
    data.institutionName = nullToNa(
      get(
        response,
        "PublicRelations[0].PublicRelationDetails.applicantDetails.additionalDetail.institutionName",
        "NA"
      )
    );
    data.telephoneNumber = nullToNa(
      get(
        response,
        "PublicRelations[0].PublicRelationDetails.applicantDetails.additionalDetail.telephoneNumber",
        "NA"
      )
    );
    data.institutionDesignation = nullToNa(
      get(
        response,
        "PublicRelations[0].PublicRelationDetails.applicantDetails.additionalDetail.institutionDesignation",
        "NA"
      )
    );

    // Documents

    // User Data
    loadUserNameData(get(response, "PublicRelations[0].auditDetails.lastModifiedBy"));
  }
  store.dispatch(prepareFinalObject("applicationDataForPdf", data));
};

export const loadReceiptData = async (consumerCode, tenant) => {
  let data = {};
  let queryObject = [
    {
      key: "tenantId",
      value: tenant
    },
    {
      key: "consumerCodes",
      value: consumerCode
    }
  ];
  let response = await getReceiptData(queryObject);

  if (response && response.Receipt && response.Receipt.length > 0) {
    data.receiptNumber = nullToNa(
      get(response, "Receipt[0].Bill[0].billDetails[0].receiptNumber", "NA")
    );
    data.amountPaid = get(
      response,
      "Receipt[0].Bill[0].billDetails[0].amountPaid",
      0
    );
    data.totalAmount = get(
      response,
      "Receipt[0].Bill[0].billDetails[0].totalAmount",
      0
    );
    data.amountDue = data.totalAmount - data.amountPaid;
    data.paymentMode = nullToNa(
      get(response, "Receipt[0].instrument.instrumentType.name", "NA")
    );
    data.transactionNumber = nullToNa(
      get(response, "Receipt[0].instrument.transactionNumber", "NA")
    );
    data.bankName = get(response, "Receipt[0].instrument.bank.name", "NA");
    data.branchName = get(response, "Receipt[0].instrument.branchName", null);
    data.bankAndBranch = nullToNa(
      data.bankName && data.branchName
        ? data.bankName + ", " + data.branchName
        : get(data, "bankName", "NA")
    );
    data.paymentDate = nullToNa(
      epochToDate(
        get(response, "Receipt[0].Bill[0].billDetails[0].receiptDate", 0)
      )
    );
    data.g8ReceiptNo = nullToNa(
      get(
        response,
        "Receipt[0].Bill[0].billDetails[0].manualReceiptNumber",
        "NA"
      )
    );
    data.g8ReceiptDate = nullToNa(
      epochToDate(
        get(response, "Receipt[0].Bill[0].billDetails[0].manualReceiptDate", 0)
      )
    );
    /** START NOC Fee, Adhoc Penalty/Rebate Calculation */
    let nocAdhocPenalty = 0,
      nocAdhocRebate = 0;
    response.Receipt[0].Bill[0].billDetails[0].billAccountDetails.map(item => {
      let desc = item.taxHeadCode ? item.taxHeadCode : "";
      if (desc === "PublicRelation_FEES") {
        data.nocFee = item.amount;
      } else if (desc === "PublicRelation_ADHOC_PENALTY") {
        nocAdhocPenalty = item.amount;
      } else if (desc === "PublicRelation_ADHOC_REBATE") {
        nocAdhocRebate = item.amount;
      } else if (desc === "PublicRelation_TAXES") {
        data.nocTaxes = item.amount;
      }
    });
    data.nocPenaltyRebate = "NA";
    data.nocAdhocPenaltyRebate = nocAdhocPenalty + nocAdhocRebate;
    /** END */
  }
  store.dispatch(prepareFinalObject("receiptDataForPdf", data));
};

export const loadMdmsData = async tenantid => {
  let localStorageLabels = JSON.parse(
    window.localStorage.getItem(`localization_${getLocale()}`)
  );
  let localizationLabels = transformById(localStorageLabels, "code");
  let data = {};
  let queryObject = [
    {
      key: "tenantId",
      value: `${tenantid}`
    },
    {
      key: "moduleName",
      value: "tenant"
    },
    {
      key: "masterName",
      value: "tenants"
    }
  ];
  let response = await getMdmsData(queryObject);

  if (
    response &&
    response.MdmsRes &&
    response.MdmsRes.tenant.tenants.length > 0
  ) {
    let ulbData = response.MdmsRes.tenant.tenants.find(item => {
      return item.code == tenantid;
    });
    /** START Corporation name generation logic */
    const ulbGrade = get(ulbData, "city.ulbGrade", "NA")
      ? getUlbGradeLabel(get(ulbData, "city.ulbGrade", "NA"))
      : "MUNICIPAL CORPORATION";

    const cityKey = `TENANT_TENANTS_${get(ulbData, "code", "NA")
      .toUpperCase()
      .replace(/[.]/g, "_")}`;

    data.corporationName = `${getTranslatedLabel(
      cityKey,
      localizationLabels
    ).toUpperCase()} ${getTranslatedLabel(ulbGrade, localizationLabels)}`;

    /** END */
    data.corporationAddress = get(ulbData, "address", "NA");
    data.corporationContact = get(ulbData, "contactNumber", "NA");
    data.corporationWebsite = get(ulbData, "domainUrl", "NA");
    data.corporationEmail = get(ulbData, "emailId", "NA");
  }
  store.dispatch(prepareFinalObject("mdmsDataForPdf", data));
};

export const loadUserNameData = async uuid => {
  let data = {};
  let bodyObject = {
    uuid: [uuid]
  };
  let response = await getUserDataFromUuid(bodyObject);

  if (response && response.user && response.user.length > 0) {
    data.auditorName = get(response, "user[0].name", "NA");
  }
  store.dispatch(prepareFinalObject("userDataForPdf", data));
};

/** Data used for creation of receipt is generated and stored in local storage here */
export const loadPdfGenerationData = (applicationNumber, tenant) => {
  /** Logo loaded and stored in local storage in base64 */
  loadUlbLogo(tenant);
  loadApplicationData(applicationNumber, tenant); //PB-FN-2019-06-14-002241
  loadReceiptData(applicationNumber, tenant); //PB-FN-2019-06-14-002241
  loadMdmsData(tenant);
};
