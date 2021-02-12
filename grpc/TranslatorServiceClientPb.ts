/**
 * @fileoverview gRPC-Web generated client stub for translator
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as translator_pb from './translator_pb';


export class TranslatorClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoTranslate = new grpcWeb.AbstractClientBase.MethodInfo(
    translator_pb.TranslateResponse,
    (request: translator_pb.TranslateRequest) => {
      return request.serializeBinary();
    },
    translator_pb.TranslateResponse.deserializeBinary
  );

  translate(
    request: translator_pb.TranslateRequest,
    metadata: grpcWeb.Metadata | null): Promise<translator_pb.TranslateResponse>;

  translate(
    request: translator_pb.TranslateRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: translator_pb.TranslateResponse) => void): grpcWeb.ClientReadableStream<translator_pb.TranslateResponse>;

  translate(
    request: translator_pb.TranslateRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: translator_pb.TranslateResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/translator.Translator/Translate',
        request,
        metadata || {},
        this.methodInfoTranslate,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/translator.Translator/Translate',
    request,
    metadata || {},
    this.methodInfoTranslate);
  }

}

