import {
    getCommonCard,
    getCommonContainer,
    getCommonTitle,
    getPattern,
    getSelectField,
    getTextField
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import {
    handleScreenConfigurationFieldChange as handleField,
    prepareFinalObject,
    toggleSnackbar
  } from "egov-ui-framework/ui-redux/screen-configuration/actions";
  import { getTenantId, localStorageGet } from "egov-ui-kit/utils/localStorageUtils";
  import get from "lodash/get";
  import { httpRequest } from "../../../../../ui-utils/api";
  import { fetchLocalizationLabel } from "egov-ui-kit/redux/app/actions";
  import { getLocale } from "egov-ui-kit/utils/localStorageUtils";
  import "./index.css";
  
  const showHideMapPopup = (state, dispatch) => {
    let toggle = get(
      state.screenConfiguration.screenConfig["apply"],
      "components.div.children.formwizardSecondStep.children.propertyLocationDetails.children.cardContent.children.mapsDialog.props.open",
      false
    );
    dispatch(
      handleField(
        "apply",
        "components.div.children.formwizardSecondStep.children.propertyLocationDetails.children.cardContent.children.mapsDialog",
        "props.open",
        !toggle
      )
    );
  };
  
  
  
  // GET EMPLOYEES
  const GetEmployees = async (action, state, dispatch,deptvalue) => {
    try {
      let payload = null;
      let user=[]
       const queryStr = [
          { key: "departments", value: deptvalue },
        ]
      payload = await httpRequest(
        "post",
        "/egov-hrms/employees/_search",
        "_search",
        queryStr,
        {}
      );
      for(let i=0;i<payload.Employees.length;i++)
      {
        if(payload.Employees[i].user!==null)
        {
          user.push(payload.Employees[i].user) 
          
        }
      }
      dispatch(prepareFinalObject("applyScreenMdmsData.employees", user));
    } catch (e) {
      console.log(e);
    }
  };
  const getDetailsFromProperty = async (state, dispatch) => {
    try {
      const propertyId = get(
        state.screenConfiguration.preparedFinalObject,
        "PublicRelations[0].PublicRelationDetails.propertyDetails.propertyId",
        ""
      );
  
      const tenantId = getTenantId();
      if (!tenantId) {
        dispatch(
          toggleSnackbar(
            true,
            {
              labelName: "Please select city to search by property id !!",
              labelKey: "ERR_SELECT_CITY_TO_SEARCH_PROPERTY_ID"
            },
            "warning"
          )
        );
        return;
      }
      if (propertyId) {
        let payload = await httpRequest(
          "post",
          `/pt-services-v2/property/_search?tenantId=${tenantId}&ids=${propertyId}`,
          "_search",
          [],
          {}
        );
        if (
          payload &&
          payload.Properties &&
          payload.Properties.hasOwnProperty("length")
        ) {
          if (payload.Properties.length === 0) {
            dispatch(
              toggleSnackbar(
                true,
                {
                  labelName: "Property is not found with this Property Id",
                  labelKey: "ERR_PROPERTY_NOT_FOUND_WITH_PROPERTY_ID"
                },
                "info"
              )
            );
            dispatch(
              handleField(
                "apply",
                "components.div.children.formwizardSecondStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocPropertyID",
                "props.value",
                ""
              )
            );
          } else {
            dispatch(
              handleField(
                "apply",
                "components.div.children.formwizardSecondStep.children.propertyLocationDetails.children.cardContent.children.propertyDetailsConatiner.children.propertyMohalla",
                "props.value",
                {
                  value: payload.Properties[0].address.locality.code,
                  label: payload.Properties[0].address.locality.name
                }
              )
            );
            dispatch(
              prepareFinalObject(
                "PublicRelations[0].PublicRelationDetails.propertyDetails.address",
                payload.Properties[0].address
              )
            );
           
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  
  export const EventFirstStepperDetail = getCommonCard(
    {
      header: getCommonTitle(
        {
          labelName: "Event Details",
          labelKey: "PR_EVENT_DETAILS_HEADER"
        },
        {
          style: {
            marginBottom: 18
          }
        }
      ),
  
      propertyDetailsConatiner: getCommonContainer({
        EventTitle: getTextField({
          label: {
            labelName: "Event Title",
            labelKey: "PR_EVENT_TITLE_LABEL"
          },
          placeholder: {
            labelName: "Enter Event Title",
            labelKey: "PR_EVENT_TITLE_PLACEHOLDER"
          },
          
         
          jsonPath: "PublicRelation[0].CreateEventDetails.eventTitle",
          required: true,
          pattern: getPattern("EventTitle"),
          errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG"
        }),
        area: {
          ...getSelectField({
            label: { labelName: "Area", labelKey: "PR_AREA_LABEL" },
            
            optionLabel: "name",
            optionValue: "name",
            placeholder: {
              labelName: "Select Area",
              labelKey: "PR_AREA_PLACEHOLDER"
            },
            sourceJsonPath: "applyScreenMdmsData.[RAINMAKER-PR].localityAreaName",
            jsonPath: "PublicRelation[0].CreateEventDetails.area",
            required: true,
            
            props: {
              className:"applicant-details-error",
             required: true
              // disabled: true
            }
          }),
        
        },
        EventLocation: getTextField({
          label: {
            labelName: "Event Location",
            labelKey: "PR_EVENT_LOCATION_LABEL"
          },
         
          
          placeholder: {
            labelName: "Enter Event Location",
            labelKey: "PR_EVENT_LOCATION_PLACEHOLDER"
          },
         
          jsonPath: "PublicRelation[0].CreateEventDetails.eventLocation",
          required: true,
          pattern: getPattern("AlphaNumValidationLocation"),
          errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG"
        }),
        typeOfEvent: {
          ...getSelectField({
            label: { labelName: "Type Of Event", labelKey: "PR_TYPE_OF_EVENT_LABEL" },
           
            optionLabel: "name",
            optionValue: "name",
            placeholder: {
              labelName: "Select Type Of Event",
              labelKey: "PR_TYPE_OF_EVENT_PLACEHOLDER"
            },
            sourceJsonPath: "applyScreenMdmsData.[RAINMAKER-PR].eventType",
            jsonPath: "PublicRelation[0].CreateEventDetails.eventType",
            required: true,
            
            props: {
              className:"applicant-details-error",
             required: true
              // disabled: true
            }
          }),
        
        },
        sector:{  ...getSelectField({
          label: {
            labelName: "Sector",
            labelKey: "PR_SECTOR_LABEL"
          },
          placeholder: {
            labelName: "Enter Sector",
            labelKey: "PR_SECTOR_PLACEHOLDER"
          },
       optionLabel: "name",
            optionValue: "name",
            
         required: false,
         props: {
           className:"applicant-details-error",
        
         },
        sourceJsonPath: "applyScreenMdmsData.[RAINMAKER-PR].eventSector",
  
          jsonPath: "PublicRelation[0].CreateEventDetails.sector"
        })
      },
      committiee: {
        ...getSelectField({
          label: { labelName: "Committiee", labelKey: "PR_COMMITTEE_LABEL" },
         
          optionLabel: "committeeName",
          optionValue:"committeeUuid",
          placeholder: {
            labelName: "Select Committiee",
            labelKey: "PR_COMMITTEE_PLACEHOLDER"
          },
          sourceJsonPath: "committieeData",
          jsonPath: "PublicRelation[0].CreateEventDetails.committeeUuid",
          required: false,
          props: {
            className:"applicant-details-error",
            required: false,
           disabled:localStorageGet("modulecode")==="PR"?false:true
          }
        }),
      
      },
      organizerDetail: {
          ...getSelectField({
            label: { labelName: "Organizer Department", labelKey: "PR_ORGANIZER_DETAILS_LABEL" },
           
            optionLabel: "name",
            optionValue: "code",
            placeholder: {
              labelName: "Select Organizer Detail",
              labelKey: "PR_ORGANIZER_DETAIL_PLACEHOLDER"
            },
            sourceJsonPath: "applyScreenMdmsData[common-masters].Department",
           required: true,
            id:'dept',
            jsonPath: "PublicRelation[0].CreateEventDetails.organizerDepartmentName",
            props: {
              className:"applicant-details-error",
             required: true
             
            },
           
            afterFieldChange: (action, state, dispatch) => {
  
               
            
              GetEmployees(action, state, dispatch,action.value)            
             }
          }),
        
        },
        organizerEmployee: {
          ...getSelectField({
            label: { labelName: "Organizer Employee", labelKey: "PR_ORGANIZER_EMPLOYEE_LABEL" },
          
            optionLabel: "name",
            optionValue: "name",
            placeholder: {
              labelName: "Select Organizer Employee",
              labelKey: "PR_ORGANIZER_EMPLOYEE_PLACEHOLDER"
            },
            sourceJsonPath: "applyScreenMdmsData.employees",
           required: false,
            
            jsonPath: "PublicRelation[0].CreateEventDetails.organizerUsernName",
            props: {
              className:"applicant-details-error",
             required: false
            },
           
        
          }),
        
        },
  
  
        
        Eventbudjet: getTextField({
          label: {
            labelName: "Event Budjet",
            labelKey: "PR_EVENT_BUDJET_LABEL"
          },
          placeholder: {
            labelName: "Enter Event Budjet",
            labelKey: "PR_EVENT_BUDGET_PLACEHOLDER"
          },
        //  required: true,
          pattern: getPattern("budget"),
         
          jsonPath: "PublicRelation[0].CreateEventDetails.eventBudget"
        }),
        
        
      }),
      
     
    },
    {
      style: { overflow: "visible" }
    }
  );
  