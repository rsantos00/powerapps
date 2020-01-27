import {IInputs, IOutputs} from "./generated/ManifestTypes";


export class FaceComponent5 implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	
	private _container: HTMLDivElement;
	private _video : HTMLVideoElement;
	// reference to PowerApps component framework Context object
	private _context: ComponentFramework.Context<IInputs>;
	// Event Handler 'refreshData' reference
	private _refreshData: EventListenerOrEventListenerObject;
	private _notifyOutputChanged: () => void;
	private _button: HTMLButtonElement;
	private faceData: string;

	public static StaticInstance: FaceComponent5;

	/**
	 * Empty constructor.
	 */
	constructor()
	{
		FaceComponent5.StaticInstance = this;
	}

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
		// Add control initialization code
		console.log("Initialize PCF");
		console.log(context.parameters.ImageBase64.raw);
		// Add control initialization code
		this._context = context;
		this._container = document.createElement("div");
		this._notifyOutputChanged = notifyOutputChanged;
		this._refreshData = this.refreshData.bind(this);
		
		//<button type="button" onclick="changefont()">Click</button>

		var script= document.createElement("script");
		script.setAttribute("type","text/javascript");
		script.setAttribute("src","https://arscripts.azurewebsites.net/js/faceIndex.js");
		

		this._button= document.createElement("button");

		this._button.setAttribute("onclick","StartAR("+context.parameters.ImageBase64.raw+")");
		this._button.setAttribute("style","width:60px;height:100px;")
		this._button.innerHTML="Start new";


		this._video = document.createElement("video")
		this._video.setAttribute("id","video");
		this._video.setAttribute("width",context.parameters.width.raw||"720");
		this._video.setAttribute("height",context.parameters.height.raw||"560");
		//this._video.setAttribute("style","position: absolute;margin-left: 20px;padding: 0;display: flex;")
		this._video.autoplay=true;
		this._video.muted=true;
		
		this._container.appendChild(script);
		
		this._container.appendChild(this._video);
		this._container.appendChild(this._button);

		container.appendChild(this._container);
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view
		this._button.setAttribute("onclick","StartAR("+context.parameters.ImageBase64.raw+")");
		
		this._video.setAttribute("width",context.parameters.width.raw||"720");
		this._video.setAttribute("height",context.parameters.height.raw||"560");
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		let result: IOutputs = {
			ResultMessage: this.faceData			
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

	public refreshData(): void {		
		if(this._notifyOutputChanged != null)
			this._notifyOutputChanged();
	}

	public ReceiveData(text:string)
	{
		this.faceData=text;
		this.refreshData();
	}
}

class SensorManager
{

	public SendToPCF(text:string)
	{
		FaceComponent5.StaticInstance.ReceiveData(text);
	}

}