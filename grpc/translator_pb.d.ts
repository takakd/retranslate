import * as jspb from 'google-protobuf'



export class TranslateRequest extends jspb.Message {
  getText(): string;
  setText(value: string): TranslateRequest;

  getSrclang(): LangType;
  setSrclang(value: LangType): TranslateRequest;

  getTargetlang(): LangType;
  setTargetlang(value: LangType): TranslateRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TranslateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: TranslateRequest): TranslateRequest.AsObject;
  static serializeBinaryToWriter(message: TranslateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TranslateRequest;
  static deserializeBinaryFromReader(message: TranslateRequest, reader: jspb.BinaryReader): TranslateRequest;
}

export namespace TranslateRequest {
  export type AsObject = {
    text: string,
    srclang: LangType,
    targetlang: LangType,
  }
}

export class TranslateResponse extends jspb.Message {
  getText(): string;
  setText(value: string): TranslateResponse;

  getSrclang(): LangType;
  setSrclang(value: LangType): TranslateResponse;

  getTranslatedtextlistMap(): jspb.Map<string, TranslatedText>;
  clearTranslatedtextlistMap(): TranslateResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TranslateResponse.AsObject;
  static toObject(includeInstance: boolean, msg: TranslateResponse): TranslateResponse.AsObject;
  static serializeBinaryToWriter(message: TranslateResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TranslateResponse;
  static deserializeBinaryFromReader(message: TranslateResponse, reader: jspb.BinaryReader): TranslateResponse;
}

export namespace TranslateResponse {
  export type AsObject = {
    text: string,
    srclang: LangType,
    translatedtextlistMap: Array<[string, TranslatedText.AsObject]>,
  }
}

export class TranslatedText extends jspb.Message {
  getText(): string;
  setText(value: string): TranslatedText;

  getLang(): LangType;
  setLang(value: LangType): TranslatedText;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TranslatedText.AsObject;
  static toObject(includeInstance: boolean, msg: TranslatedText): TranslatedText.AsObject;
  static serializeBinaryToWriter(message: TranslatedText, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TranslatedText;
  static deserializeBinaryFromReader(message: TranslatedText, reader: jspb.BinaryReader): TranslatedText;
}

export namespace TranslatedText {
  export type AsObject = {
    text: string,
    lang: LangType,
  }
}

export enum LangType { 
  UNKOWN = 0,
  JP = 1,
  EN = 2,
}
