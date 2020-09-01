const remoteConfigPath = (path, screenKey) => {
  let config = {};
  switch (path) {
    case "rented-properties": 
    case "rented-properties-citizen":
      config = require(`egov-rented-properties/ui-config/screens/specs/${path}/${screenKey}`).default;
      break;
    case "egov-common":
      config = require(`egov-common/ui-config/screens/specs/${path}/${screenKey}`).default;
      break;
    default:
      config = require(`ui-config/screens/specs/${path}/${screenKey}`).default;
      break;
  }
  return config;
};

export default remoteConfigPath;
