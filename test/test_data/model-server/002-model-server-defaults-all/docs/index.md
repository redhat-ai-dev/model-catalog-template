# **Access & Usage Information**

<!--
Add information to this document to cover how to access the model server, along with usage examples
-->


##  **Model Server URL**

The model server can be accessed [here](https://ibm-granite-8b-code-instruct-3scale-apicast-production.apps.domain.com).

## **Authentication**

<!--
If your model server has specific instructions to authneticate to it, add them here.
-->
In order to gain access to the model server you will need to sign in with your SSO credentials by selecting Google auth. Once you have signed in you are able to generate a token by navigating to *Apps and API Keys* on the top ribbon and hitting *Create new Application*. Once a token has been generated, you will be provided with the API server URL.

## **API Schema**
<!--
The name of the api, model-service-api, is grabbed from the name field in the catalog-info.yaml metadata for the api.
We can use absolute paths to navigate the TechDocs to reference other resources/components/apis.
-->

The API Schema is available [here](/catalog/default/api/{{ values.modelServerName }}/definition).