# Notification Control - PowerApps Component Framework integrated with SignalR
- All code is provided as is, you can do anything you want with the code.

If you can let me know how did I help you, I'm always glad when I know I have added value ;)

Steps:

1) Change the index.ts and place your own info:
private _signalRApi: string="https://your_azure_function_site.azurewebsites.net/api";
private _mainurl: string=  "https://your_org_name.crm4.dynamics.com/main.aspx?pagetype=entityrecord&etn=contact&";

2) To build the solution:
msbuild /t:restore
Msbuild

3) For full configuration and explanation:
https://powerapps.microsoft.com/en-us/blog/notification-control-using-powerapps-component-framework-and-azure-signalr/

4) For video with the possibilities:
https://www.linkedin.com/posts/ruisantosnor_inovation-digitaltransformation-powerapps-activity-6584057433772044288-zTof


