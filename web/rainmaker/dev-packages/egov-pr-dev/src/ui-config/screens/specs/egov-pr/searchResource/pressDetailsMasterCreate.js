import {
    getCommonCard,
    getCommonContainer,
    getCommonParagraph,
    getCommonTitle,
    getDateField,
    getLabel,
    getPattern,
    getSelectField,
    getTextField
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  
export const pressDetailsApplication = getCommonCard({
    subHeader: getCommonTitle({
        labelName: "Press Master Details",
        labelKey: "PR_PRESS_DETAILS"
    }),
    
    appStatusAndToFromDateContainer: getCommonContainer({
      publicationName: {
        ...getTextField({
          label: {
            labelName: "Publication Name",
            labelKey: "PR_PRESS_DETAILS_PUBLICATION_NAME"
          },
          placeholder: {
            labelName: "Publication Name",
            labelKey: "PR_PRESS_DETAILS_PUBLICATION_NAME"
          },
          pattern: getPattern("TextValidation"),
          errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
          required: true,
          jsonPath: "PRESSDETAILS.publicationName"
        })
      }, 
      typeOfThePress: {
        ...getSelectField({
          label: {
             labelName: "Type of the press", 
             labelKey: "PR_PRESS_DETAILS_TYPE_OF_PRESS" 
            },
          optionLabel: "name",
          optionValue: "name",
          placeholder: {
            labelName: "Type of the press",
            labelKey: "PR_PRESS_DETAILS_TYPE_OF_PRESS"
          },          
          sourceJsonPath: "applyScreenMdmsData['RAINMAKER-PR'].pressType",
          jsonPath: "PRESSDETAILS.typeOfThePress",
          required: false,
          props: {
            className: "applicant-details-error",
            required: true
          },
  
        }),
      },
        name: {
            ...getTextField({
              label: {
                labelName: "Personnel Name",
                labelKey: "PR_PRESS_DETAILS_PERSONNEL_NAME"
              },
              placeholder: {
                labelName: "Personnel Name",
                labelKey: "PR_PRESS_DETAILS_PERSONNEL_NAME"
              },
              pattern: getPattern("TextValidation"),
              errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
              required: true,
              jsonPath: "PRESSDETAILS.name"
            })
          },    
         
         
          emailId: getTextField({
            label: {
              labelName: "Email Id",
              labelKey: "PR_PRESS_DETAILS_EMAILID"
            },
            placeholder: {
              labelName: "Email Id",
              labelKey: "PR_PRESS_DETAILS_EMAILID"
            },
            pattern: getPattern("Email"),
            errorMessage: "Invalid Email",
            jsonPath:
              "PRESSDETAILS.emailId",
              required: true,
            gridDefination: {
              xs: 12,
              sm: 12,
              md: 6
            },
            props:{
              className:"applicant-details-error",
              required: true
            }
          }),
          mobileNumber: getTextField({
            label: {
              labelName: "Mobile Number",
              labelKey: "PR_APPLICANT_MOBILE_NO_LABEL"
            },
            placeholder: {
              labelName: "Mobile Number",
              labelKey: "PR_APPLICANT_MOBILE_NO_LABEL"
            },
            required: true,
            props:{
              className:"applicant-details-error"
            },
            
            pattern: getPattern("MobileNo"),
            errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
             jsonPath: "PRESSDETAILS.mobileNo",
                      
            gridDefination: {
              xs: 12,
              sm: 12,
              md: 6
            }
          }),
        
    }),
  
  
  });
  