import { ClientBuilder } from "@commercetools/sdk-client-v2";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";

const CTP_PROJECT_KEY = "bics_pan_india";

export const projectKey = CTP_PROJECT_KEY;

const authMiddlewareOptions = {
  host: "https://auth.us-central1.gcp.commercetools.com",
  projectKey,
  credentials: {
    clientId: "TayQoqyG64sutRMPpittvCGb",
    clientSecret: "t8WaLKPwJ3TJv2Y84rJiifo6WYiyDivI",
  },
  scopes: [`manage_project:${projectKey}`],
};

const httpMiddlewareOptions = {
  host: "https://api.us-central1.gcp.commercetools.com",
};

const client = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export const getApiRoot = () => {
  return createApiBuilderFromCtpClient(client);
};
