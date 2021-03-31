import validateColor from "validate-color";
export default class Commands {
    // Cada comando é um MEME diferente no vídeo
    private commands = {
        MagicWall: ["!parede", "!wall", "!magicwall"],
    };
    private _isCommand = false;
    private _isColor = false;
    private _command:string;
    private _commandValue:string;
    constructor(private message: string){
        Object.keys(this.commands).forEach(e => {
            if(!this._isCommand){
                this.commands[e].forEach(element => {
                    if(message.toLowerCase().startsWith(element)){
                        this._isCommand = true;
                        this._command = e;
                        this._commandValue = message.substr(element.length).trim();
                        this._isColor = this.setColor();
                        return;
                    }
                });
            }
        });
    }
    get command(){
        return this._command;
    }
    get value(){
        return this._commandValue;
    }
    get isCommand(){
        return this._isCommand;
    }
    get isColor(){
        return this._isColor;
    }
    setColor(): boolean{
        return validateColor(this._commandValue);
    }
}