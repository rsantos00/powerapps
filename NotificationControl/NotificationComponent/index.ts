import {IInputs, IOutputs} from "./generated/ManifestTypes";
import * as signalR from "@aspnet/signalr";
import { string } from "prop-types";
import { stringify } from "querystring";

export class NotificationComponent implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	
	private _signalRApi: string="https://your_azure_function_site.azurewebsites.net/api";
	private _mainurl: string=  "https://your_org_name.crm4.dynamics.com/main.aspx?pagetype=entityrecord&etn=contact&";
	
	private tbMessage: HTMLInputElement;
	private _refreshData: EventListenerOrEventListenerObject;
	private _container: HTMLDivElement;
	private _ImageContainer: HTMLDivElement;
	private _receivedMessage: ReceivedModel;
	private _notifyOutputChanged: () => void;
	private _context: ComponentFramework.Context<IInputs>;
	private connection: signalR.HubConnection;
	private _lastMessage: Model;
	private _urlTemp:string;

	constructor(){	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		this._notifyOutputChanged = notifyOutputChanged;
		this._receivedMessage= {"id":"0","sender":"","text":""};

		
		this.connection = new signalR.HubConnectionBuilder()
			.withUrl(this._signalRApi)
			.configureLogging(signalR.LogLevel.Information)
			.build();

		console.log("connection created to "+ this._signalRApi);

		this._context = context;
		
		  let m = document.createElement("div");
		  m.innerHTML =document.location.href;
		 container.appendChild(m);
		
		this.connection.on("newMessage", (message:Model) => {
			console.log(document.location);
			console.log("My Location:"+document.location.href);
			console.log("Notification control: Received NewMessage->"+stringify(message));
			if(message != this._lastMessage && message.type=="refresh" && document.location.hostname.includes(".dynamics.com"))
			{
				console.log("Notification control: Received refresh of sender "+ message.sender);
				switch(message.sender)
				{
					case "customerservice":
						this._urlTemp= this._mainurl+ "appid=045cbed7-5fcc-e911-a830-000d3a3a67ef&id="+message.text;
					break;

					case "sales":
						this._urlTemp= this._mainurl+ "appid=1180fac8-5fcc-e911-a830-000d3a3a67ef&id="+message.text;
					break;

					case "fieldservice":
							this._urlTemp= this._mainurl+ "appid=71c17a65-6ccc-e911-a830-000d3a3a67ef&id="+message.text;
					break;

					case "marketing":
							this._urlTemp= this._mainurl+ "appid=0ddba2b2-9ed4-e911-a82a-000d3a43d4be&id="+message.text;
					break;

					case "fando":
							this._urlTemp= this._mainurl+ "appid=1180fac8-5fcc-e911-a830-000d3a3a67ef&id="+message.text;
					break;

				}
				console.log("Notification control: Going to open the page: "+this._urlTemp);
				document.location.replace( this._urlTemp); // do the refresh
			}
			
			this._notifyOutputChanged();

		});

		this.connection.start()
		.then( ()=> {			
			let m = document.createElement("div");
			m.innerHTML ="Waiting";			
			container.appendChild(m);

		})
	  	.catch(err => console.log(err));

	}	

	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		console.log("Notification control: Update Received");
		console.log("My Location:"+document.location);
		this._context = context;
		// Add code to update control view
		let updateMessage= JSON.parse(this._context.parameters.MessageToSend.raw!= null?
		   this._context.parameters.MessageToSend.raw:"");
		 if(updateMessage.sender == this._receivedMessage.sender)
		 	return;
		this._receivedMessage=updateMessage;
		// this._lastMessage=updateMessage;
		this.httpCall("post",this._signalRApi+"/messages",
				updateMessage
				, (res)=>{ console.log(res)});

		console.log("Notification control: Message sent from update");

	}

	/**
	 * It is called by the framework prior to a control receiving new data.
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		//console.log("getOutputs")
		let result: IOutputs = {
			ReceivedMessageText: this._lastMessage.text,
			ReceivedMessageType: this._lastMessage.type,
			ReceivedMessageSender:this._lastMessage.sender
		};
		return result;
	}

	/**
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}

	public send(): void {
		this.httpCall("post",this._signalRApi+"/messages",
			{
				sender: "image@test.com",
				text: "data:image/png;base64, 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"
			}, (res)=>{ console.log(res)});

		console.log("Message Sent");
	}

	// Simple function to GET or POST
	public httpCall(method: string, url:string, data:any, callback:(result:any)=>any): void {
		var xhr = new XMLHttpRequest();
		console.log(url);
		xhr.open(method, url, true);
		if (data != null) {
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.send(JSON.stringify(data));
		}
		else xhr.send();
	}
}

 class Model
{
	sender: string;
	text: string;
	type:string;
}

class ReceivedModel
{
	id: string;
	sender:string;
	text: string;
}
