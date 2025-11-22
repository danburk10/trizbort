import { Map, Obj } from "../../models";
import { Direction, ObjectKind, ConnectorType } from "../../enums";
import { CodeGenerator } from "../CodeGenerator";

export class PunyInformGenerator extends CodeGenerator {
  
  constructor(map: Map) {
    super(map); 
    Handlebars.registerHelper('className', (name:string) => { return this.className(name); }); 
    Handlebars.registerHelper('dirToStr', (dir:Direction, type:ConnectorType) => { return this.dirToStr(dir, type); }); 
    Handlebars.registerHelper('kindToStr', (kind:ObjectKind) => { return this.kindToStr(kind); }); 
    Handlebars.registerPartial('punyinformObject', Handlebars.templates.punyinformObject);
    Handlebars.registerHelper('buildObject', (obj: Obj) => { 
      return this.buildObject(obj); 
    });
  }

  protected kindToStr(dir: ObjectKind): string {
    switch(dir) {
      case ObjectKind.Actor:   return "Actor";
      case ObjectKind.Item:    return "Item";
      case ObjectKind.Scenery: return "Decoration";
      default: return "";
    }     
  }

  protected buildObject(obj: Obj, level?: number) {
    if(!level) level = 1;
    let str = "";
    for(let i = 0; i < level; i++) str += "+";
    str = str + Handlebars.templates.punyinformObject({ obj: obj });
    obj.content.forEach((o) => {
      str = str + this.buildObject(o, level + 1);
    });
    return new Handlebars.SafeString(str);
  }

  public generate() : string {
    return Handlebars.templates.punyinform({ map: this.map });
  }

  protected dirToStr(dir: Direction, type: ConnectorType): string {
    // Special connections:
    switch(type) {
      case ConnectorType.Down: return "d";
      case ConnectorType.Up:   return "up";
      case ConnectorType.In:   return "in";
      case ConnectorType.Out:  return "out";
    }
    // Compass connections:
    switch(dir) {
      case Direction.N:   return "N";
      case Direction.NNE: return "NNE";
      case Direction.NE:  return "NE";
      case Direction.ENE: return "ENE";
      case Direction.E:   return "E";
      case Direction.ESE: return "ESE";
      case Direction.SE:  return "SE";
      case Direction.SSE: return "SSE";
      case Direction.S:   return "S";
      case Direction.SSW: return "SSW";
      case Direction.SW:  return "SW";
      case Direction.WSW: return "WSW";
      case Direction.W:   return "W";
      case Direction.WNW: return "WNW";
      case Direction.NW:  return "NW";
      case Direction.NNW: return "NNW";         
      default: return "";
    }    
  }


}
