import {
  getCommonCard,
  getCommonTitle,
  getTextField,
  getDateField,
  getSelectField,
  getCommonContainer,
  getPattern
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { getTodaysDateInYMD } from "../../utils";

export const SepDetails = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Application for SEP program",
      labelKey: "NULM_APPLICATION_FOR_SEP_PROGRAM"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),
  SepDetailsContainer: getCommonContainer({
   
    applicantname: {
      ...getTextField({
        label: {
          labelName: "Name of Applicant",
          labelKey: "NULM_SEP_NAME_OF_APPLICANT"
        },
        placeholder: {
          labelName: "Enter Name of Applicant",
          labelKey: "NULM_SEP_NAME_OF_APPLICANT_PLACEHOLDER"
        },
        required: true,
        pattern: getPattern("Name") || null,
        jsonPath: "priceLists[0].supplier.code",       
      })
    },

    gender: {
      uiFramework: "custom-containers",
      componentPath: "RadioGroupContainer",
      gridDefination: {
        xs: 6
      },
      jsonPath: "ProcessInstances[0].employeeOtherDetails.isDuesPresent",
      type: "array",
      props: {
        required: true,
       
        label: { name: "Gender", key: "NULM_SEP_GENDER" },
        buttons: [
          {
            labelName: "FEMALE",
            labelKey: "NULM_SEP_GENDER_FEMALE",
            value:"FEMALE",           
          },
          {
            label: "MALE",
            labelKey: "NULM_SEP_GENDER_MALE",
            value:"MALE",           
          },
          {
            label: "OTHERS",
            labelKey: "NULM_SEP_GENDER_OTHERS",
            value:"OTHERS",           
          }
        ],      
        defaultValue: "MALE"
      },
      type: "array",
     
    },

    age: {
      ...getTextField({
        label: {
          labelName: "age",
          labelKey: "NULM_SEP_AGE"
        },
        placeholder: {
          labelName: "Enter age",
          labelKey: "NULM_SEP_AGE_PLACEHOLDER"
        },
        required: true,
        pattern: getPattern("age") || null,
        jsonPath: "priceLists[0].priceListDetails[0].quantity"
      })
    },
    
    dateofbirth: {
      ...getDateField({
        label: {
          labelName: "Date Of Birth",
          labelKey: "NULM_SEP_DOB"
        },
        placeholder: {
          labelName: "Enter Date Of Birth",
          labelKey: "NULM_SEP_DOB_PLACEHOLDER"
        },
        required: true,
        pattern: getPattern("Date") || null,
        jsonPath: "priceLists[0].rateContractDate",
        props: {
          inputProps: {
            max: getTodaysDateInYMD()
          }
        }
      })
    },
    adharnumber: {
      ...getTextField({
        label: {
          labelName: "Adhar Number",
          labelKey: "NULM_SEP_ADHAR_NUMBER"
        },
        placeholder: {
          labelName: "Enter Adhar Number",
          labelKey: "NULM_SEP_ADHAR_NUMBER_PLACEHOLDER"
        },
        required: true,
        pattern: getPattern("Name") || null,
        jsonPath: "priceLists[0].rateContractNumber"
      })
    },
    
    mothername: {
      ...getTextField({
        label: {
          labelName: "Mother Name",
          labelKey: "NULM_SEP_MOTHER_NAME"
        },
        placeholder: {
          labelName: "Enter Mother Name",
          labelKey: "NULM_SEP_MOTHER_NAME_PLACEHOLDER"
        },
        required: true,
        pattern: getPattern("Name") || null,
        jsonPath: "priceLists[0].agreementNumber"
      })
    },
  
    fatherhusbandname: {
      ...getTextField({
        label: {
          labelName: "Father/Husband Name",
          labelKey: "NULM_SEP_FATHER/HUSBAND_NAME"
        },
        placeholder: {
          labelName: "Enter Father/Husband Name",
          labelKey: "NULM_SEP_FATHER/HUSBAND_NAME_PLACEHOLDER"
        },
        required: true,
        pattern: getPattern("Name") || null,
        jsonPath: "priceLists[0].agreementNumber"
      })
    },

    occupation: {
      ...getTextField({
        label: {
          labelName: "Occupation",
          labelKey: "NULM_SEP_OCCUPATION"
        },
        placeholder: {
          labelName: "Enter Occupation",
          labelKey: "NULM_SEP_OCCUPATION_PLACEHOLDER"
        },
        required: true,
        pattern: getPattern("Name") || null,
        jsonPath: "priceLists[0].agreementNumber"
      })
    },

    addrss: {
      ...getTextField({
        label: {
          labelName: "Addrss",
          labelKey: "NULM_SEP_ADDRESS"
        },
        placeholder: {
          labelName: "Enter Addrss",
          labelKey: "NULM_SEP_ADDRESS_PLACEHOLDER"
        },
        required: true,
        pattern: getPattern("Address") || null,
        jsonPath: "priceLists[0].agreementNumber"
      })
    },

    contactnumber: {
      ...getTextField({
        label: {
          labelName: "Contact Number",
          labelKey: "NULM_SEP_CONTACT_NUMBER"
        },
        placeholder: {
          labelName: "Enter Contact Number",
          labelKey: "NULM_SEP_CONTACT_NUMBER_PLACEHOLDER"
        },
        required: true,
        pattern: getPattern("MobileNo") || null,
        jsonPath: "priceLists[0].priceListDetails[0].quantity"
      })
    },

    sincehowlonginchandigarh: {
      ...getTextField({
        label: {
          labelName: "Since how long in Chandigarh",
          labelKey: "NULM_SEP_SINCE_HOW_LONG_IN_CHANDIGARH"
        },
        placeholder: {
          labelName: "Enter Since how long in Chandigarh",
          labelKey: "NULM_SEP_SINCE_HOW_LONG_IN_CHANDIGARH_PLACEHOLDER"
        },
        required: true,
        pattern: getPattern("alpha-numeric-with-space") || null,
        jsonPath: "priceLists[0].agreementNumber"
      })
    },

    qualification: {
      ...getTextField({
        label: {
          labelName: "Qualification",
          labelKey: "NULM_SEP_QUALIFACATION"
        },
        placeholder: {
          labelName: "Enter Qualification",
          labelKey: "NULM_SEP_QUALIFACATION_PLACEHOLDER"
        },
        required: true,
        pattern: getPattern("alpha-numeric-with-space") || null,
        jsonPath: "priceLists[0].agreementNumber"
      })
    },

    category: {
      uiFramework: "custom-containers",
      componentPath: "RadioGroupContainer",
      gridDefination: {
        xs: 6
      },
      jsonPath: "ProcessInstances[0].employeeOtherDetails.isDuesPresent",
      type: "array",
      props: {
        required: true,
       
        label: { name: "Category", key: "NULM_SEP_CATEGORY" },
        buttons: [
          {
            labelName: "SC",
            labelKey: "NULM_SEP_SC",
            value:"SC",           
          },
          {
            label: "ST",
            labelKey: "NULM_SEP_ST",
            value:"ST",           
          },
          {
            label: "OBC",
            labelKey: "NULM_SEP_OBC",
            value:"OBC",           
          },
          {
            label: "OTHERS",
            labelKey: "NULM_SEP_CATEGORY_OTHERS",
            value:"OTHERS",           
          }
        ],
        defaultValue: "SC"
      },
      type: "array",     
    },


    urbanpoor: {
      uiFramework: "custom-containers",
      componentPath: "RadioGroupContainer",
      gridDefination: {
        xs: 6
      },
      jsonPath: "ProcessInstances[0].employeeOtherDetails.isDuesPresent",
      type: "array",
      props: {
        required: true,
       
        label: { name: "Urban Poor", key: "NULM_SEP_URBAN_ROOR" },
        buttons: [
          {
            labelName: "YES",
            labelKey: "NULM_SEP_YES",
            value:"YES",           
          },
          {
            label: "NO",
            labelKey: "NULM_SEP_NO",
            value:"NO",           
          },        
        ],      
        defaultValue: "YES"
      },
      type: "array",     
    },

   bplnumber: {
      ...getTextField({
        label: {
          labelName: "BPL NULM_SEP_BPL_NUMBER",
          labelKey: "NULM_SEP_BPL_NUMBER"
        },
        placeholder: {
          labelName: "Enter NULM_SEP_BPL_NUMBER",
          labelKey: "NULM_SEP_BPL_NUMBER_PLACEHOLDER"
        },
        required: false,
        pattern: getPattern("alpha-numeric") || null,
        jsonPath: "priceLists[0].agreementNumber"
      })
    },

    minority: {
      uiFramework: "custom-containers",
      componentPath: "RadioGroupContainer",
      gridDefination: {
        xs: 6
      },
      jsonPath: "ProcessInstances[0].employeeOtherDetails.isDuesPresent",
      type: "array",
      props: {
        required: true,
        label: { name: "Minority", key: "NULM_SEP_MINORITY" },
        buttons: [
          {
            labelName: "YES",
            labelKey: "NULM_SEP_YES",
            value:"YES",           
          },
          {
            label: "NO",
            labelKey: "NULM_SEP_NO",
            value:"NO",           
          },        
        ],      
        defaultValue: "YES"
      },
      type: "array",     
    },

    minorityreligion: {
      uiFramework: "custom-containers",
      componentPath: "RadioGroupContainer",
      gridDefination: {
        xs: 12
      },
      jsonPath: "ProcessInstances[0].employeeOtherDetails.isDuesPresent",
      type: "array",
      props: {
        required: false,
       
        label: { name: "Minority Religion", key: "NULM_SEP_MINORITY_RELIGION" },
        buttons: [
          {
            labelName: "MUSLIM",
            labelKey: "NULM_SEP_MUSLIM",
            value:"MUSLIM",           
          },
          {
            label: "SIKH",
            labelKey: "NULM_SEP_SIKH",
            value:"SIKH",           
          },
          {
            label: "CHRISTIAN",
            labelKey: "NULM_SEP_CHRISTIAN",
            value:"CHRISTIAN",           
          },
          {
            label: "JAIN",
            labelKey: "NULM_SEP_JAIN",
            value:"JAIN",           
          },
          {
            label: "BUDDHIST",
            labelKey: "NULM_SEP_BUDDHIST",
            value:"BUDDHIST",           
          },
          {
            label: "PARSIS",
            labelKey: "NULM_SEP_PARSIS",
            value:"PARSIS",           
          }
        ],
      
        defaultValue: "MUSLIM"
      },
      type: "array",     
    },

    handicapped: {
      uiFramework: "custom-containers",
      componentPath: "RadioGroupContainer",
      gridDefination: {
        xs: 6
      },
      jsonPath: "ProcessInstances[0].employeeOtherDetails.isDuesPresent",
      type: "array",
      props: {
        required: true,
       
        label: { name: "Urban Poor", key: "NULM_SEP_HANDICAPPED" },
        buttons: [
          {
            labelName: "YES",
            labelKey: "NULM_SEP_YES",
            value:"YES",           
          },
          {
            label: "NO",
            labelKey: "NULM_SEP_NO",
            value:"NO",           
          },        
        ],      
        defaultValue: "YES"
      },
      type: "array",    
    },

    typeofbusiness: {
      ...getTextField({
        label: {
          labelName: "Type of Business/Industry/Service/activity proposed to be started ",
          labelKey: "NULM_SEP_TYPE_OF_BUSINESS/INDUSTRY/SERVICE/ACTIVITY_PROPOSED_TO_BE_STARTED "
        },
        placeholder: {
          labelName: "Enter Type of Business/Industry/Service/activity proposed to be started",
          labelKey: "NULM_SEP_TYPE_OF_BUSINESS/INDUSTRY/SERVICE/ACTIVITY_PROPOSED_TO_BE_STARTED_PLACEHOLDER"
        },
        required: true,
        pattern: getPattern("alpha-numeric-with-space") || null,
        jsonPath: "priceLists[0].agreementNumber"
      })
    },

    previousexperience: {
      ...getTextField({
        label: {
          labelName: "Previous experience in the line if any",
          labelKey: "NULM_SEP_PREVIOUS_EXPERIENCE_IN_THE_LINE_IF_ANY_PLACEHOLDER"
        },
        placeholder: {
          labelName: "Enter Previous experience in the line if any",
          labelKey: "NULM_SEP_PREVIOUS_EXPERIENCE_IN_THE_LINE_IF_ANY_PLACEHOLDER"
        },
        required: true,
        pattern: getPattern("alpha-numeric-with-space") || null,
        jsonPath: "priceLists[0].agreementNumber"
      })
    },

    placeofwork: {
      ...getTextField({
        label: {
          labelName: "Place of work whether the activity is proposed to be started",
          labelKey: "NULM_SEP_PLACE_OF_WORK_WHETHER_THE_ACTIVITY_IS_PROPOSED_TO_BE_STARTED"
        },
        placeholder: {
          labelName: "Enter Place of work whether the activity is proposed to be started",
          labelKey: "NULM_SEP_PLACE_OF_WORK_WHETHER_THE_ACTIVITY_IS_PROPOSED_TO_BE_STARTED_PLACEHOLDER"
        },
        required: true,
        pattern: getPattern("alpha-numeric-with-space") || null,
        jsonPath: "priceLists[0].agreementNumber"
      })
    },

    detailsofaccount: {
      ...getTextField({
        label: {
          labelName: "Details of account of beneficiary-bank Name/Branch/A/C name (Only in Chandigarh)",
          labelKey: "NULM_SEP_OF_ACCOUNT_OF_BENEFICIARY_BANK_A_C_NAME_(ONLY_IN_CHANDIGARH)"
        },
        placeholder: {
          labelName: "Enter Details of account of beneficiary-bank Name/Branch/A/C name (Only in Chandigarh)",
          labelKey: "NULM_SEP_OF_ACCOUNT_OF_BENEFICIARY_BANK_A_C_NAME_(ONLY_IN_CHANDIGARH)_PLACEHOLDER"
        },
        required: true,
        pattern: getPattern("alpha-numeric-with-space") || null,
        jsonPath: "priceLists[0].agreementNumber"
      })
    },


    nooffamilymembers: {
      ...getTextField({
        label: {
          labelName: "No. of family members",
          labelKey: "NULM_SEP_NO_OF_FAMILY_MEMBERS"
        },
        placeholder: {
          labelName: "Enter No. of family members",
          labelKey: "NULM_SEP_NO_OF_FAMILY_MEMBERS_PLACEHOLDER"
        },
        required: true,
        pattern: getPattern("age") || null,
        jsonPath: "priceLists[0].agreementNumber"
      })
    },

    projectcost: {
      ...getTextField({
        label: {
          labelName: "Project Cost",
          labelKey: "NULM_SEP_PROJECT_COST"
        },
        placeholder: {
          labelName: "Enter Project Cost",
          labelKey: "NULM_SEP_PROJECT_COST_PLACEHOLDER"
        },
        required: false,
        pattern: getPattern("Amount") || null,
        jsonPath: "priceLists[0].priceListDetails[0].quantity"
      })
    },

    loanrequired: {
      ...getTextField({
        label: {
          labelName: "Amount of Loan required",
          labelKey: "NULM_SEP_AMOUNT_OF_LOAN_REQUIRED"
        },
        placeholder: {
          labelName: "Enter Amount of Loan required",
          labelKey: "NULM_SEP_AMOUNT_OF_LOAN_REQUIRED_PLACEHOLDER"
        },
        required: true,
        pattern: getPattern("Amount") || null,
        jsonPath: "priceLists[0].priceListDetails[0].quantity"
      })
    },


    amountrecomended: {
      ...getTextField({
        label: {
          labelName: "Amount Recommended by Task Force Committee",
          labelKey: "NULM_SEP_AMOUNT_RECOMMENDED_BY_TASK_FORCE_COMMITTEE"
        },
        placeholder: {
          labelName: "Enter Amount Recommended by Task Force Committee",
          labelKey: "NULM_SEP_AMOUNT_RECOMMENDED_BY_TASK_FORCE_COMMITTEE_PLACEHOLDER"
        },
        required: true,
        pattern: getPattern("Amount") || null,
        jsonPath: "priceLists[0].priceListDetails[0].quantity"
      })
    },

    takenloanfrom: {
      uiFramework: "custom-containers",
      componentPath: "RadioGroupContainer",
      gridDefination: {
        xs: 6
      },
      jsonPath: "ProcessInstances[0].employeeOtherDetails.isDuesPresent",
      type: "array",
      props: {
        required: true,  
        label: { name: "Whether taken loan from any banking/financial institute", 
        key: "NULM_SEP_WHETHER_TAKEN_LOAN_FROM_ANY_BANKING/FINANCIAL_INSTITUTE" },
        buttons: [
          {
            labelName: "YES",
            labelKey: "NULM_SEP_YES",
            value:"YES",           
          },
          {
            label: "NO",
            labelKey: "NULM_SEP_NO",
            value:"NO",           
          },        
        ],      
        defaultValue: "YES"
      },
      type: "array",     
    },

    repaymentmade: {
      uiFramework: "custom-containers",
      componentPath: "RadioGroupContainer",
      gridDefination: {
        xs: 6
      },
      jsonPath: "ProcessInstances[0].employeeOtherDetails.isDuesPresent",
      type: "array",
      props: {
        required: true,
       
        label: { name: "If Yes , whether all repayment made ?", 
        key: "NULM_SEP_IF_YES_WHEATHER_ALL_REPAYMENT_MADE?" },
        buttons: [
          {
            labelName: "YES",
            labelKey: "NULM_SEP_YES",
            value:"YES",           
          },
          {
            label: "NO",
            labelKey: "NULM_SEP_NO",
            value:"NO",          
          },       
        ],    
        defaultValue: "YES"
      },
      type: "array",     
    },

    recommendedby: {
      uiFramework: "custom-containers",
      componentPath: "RadioGroupContainer",
      gridDefination: {
        xs: 6
      },
      jsonPath: "ProcessInstances[0].employeeOtherDetails.isDuesPresent",
      type: "array",
      props: {
        required: false,
       
        label: { name: "Recommended by", 
        key: "NULM_SEP_RECOMMENDED_BY" },
        buttons: [
          {
            labelName: "SHG",
            labelKey: "NULM_SEP_SHG",
            value:"SHG",           
          },
          {
            label: "ALF",
            labelKey: "NULM_SEP_ALF",
            value:"ALF",           
          },
          {
            label: "BANK",
            labelKey: "NULM_SEP_BANK",
            value:"BANK",           
          },
          {
            label: "SELF",
            labelKey: "NULM_SEP_SELF",
            value:"SELF",       
          },
        
        ],
      
        defaultValue: "SHG"
      },
      type: "array",
     
    },
    representativename: {
      ...getTextField({
        label: {
          labelName: "Particulars of representative Name",
          labelKey: "NULM_SEP_PARTICULARS_OF_REPRESENTATIVE_NAME"
        },
        placeholder: {
          labelName: "Enter Particulars of representative Name",
          labelKey: "NULM_SEP_PARTICULARS_OF_REPRESENTATIVE_NAME_PLACEHOLDER"
        },
        pattern: getPattern("Name") || null,
        jsonPath: "priceLists[0].agreementNumber"
      })
    },

    representativeaddress: {
      ...getTextField({
        label: {
          labelName: "Particulars of representative Address",
          labelKey: "NULM_SEP_PARTICULARS_OF_REPRESENTATIVE_ADDRESS"
        },
        placeholder: {
          labelName: "Enter Particulars of representative Address",
          labelKey: "NULM_SEP_PARTICULARS_OF_REPRESENTATIVE_ADDRESS_PLACEHOLDER"
        },
        pattern: getPattern("Address") || null,
        jsonPath: "priceLists[0].agreementNumber"
      })
    },
  })
});