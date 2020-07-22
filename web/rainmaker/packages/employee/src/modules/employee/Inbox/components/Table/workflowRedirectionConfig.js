export const getWFConfig = (module,businessService) => {
  console.log("module", module);
  switch (module.toUpperCase()) {
    case "TL-SERVICES":
      return {
        INITIATED: "/tradelicence/apply",
        DEFAULT: "/tradelicence/search-preview",
      };
    case "WS-SERVICES":
      return {
        INITIATED: "/wns/search-preview",
        DEFAULT: "/wns/search-preview",
      };
    case "SW-SERVICES":
      return {
        INITIATED: "/wns/search-preview",
        DEFAULT: "/wns/search-preview",
      };
    case "FIRENOC":
      return {
        INITIATED: "/fire-noc/apply",
        DEFAULT: "/fire-noc/search-preview",
      };
    case "BPA-SERVICES":
      return {
        INITIATED: "/egov-bpa/search-preview",
        DEFAULT: "/egov-bpa/search-preview",
      };
    case "BPAREG":
      return {
        DEFAULT: "/bpastakeholder/search-preview",
      };
    case "PT-SERVICES":
      return {
        INITIATED: "/property-tax/application-preview",
        DEFAULT: "/property-tax/application-preview",
      };
    case "PT":
      if(businessService=="PT.CREATE"){
        return {
          INITIATED: "/property-tax/application-preview",
          DEFAULT: "/property-tax/application-preview",
        }; 
      }else{
        return {
          INITIATED: "/pt-mutation/search-preview",
          DEFAULT: "/pt-mutation/search-preview",
        }; 
      }
      // new module rediraection for case "RRP_SERVICE ,DOE_SERVICE, DOP_SERVICE":
      case "RRP_SERVICE":
        return {
          INITIATED: "/pms/pmsmap",
          DEFAULT: "/pms/pmsmap",
        };
        case "DOE_SERVICE":
          return {
            INITIATED: "/pms/pmsmap",
            DEFAULT: "/pms/pmsmap",
          };
          case "DOP_SERVICE":
          return {
            INITIATED: "/pms/pmsmap",
            DEFAULT: "/pms/pmsmap",
          };
      
    }
};
