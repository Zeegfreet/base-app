import { HttpResponse, HttpResponseCode } from "@app/protocols/index.js";

export const successHandler = {
    onSuccess: (body: HttpResponse.Body) => ({
        statusCode: HttpResponseCode.SUCCESS,
        body
    }),
    onCreated: (body: HttpResponse.Body) => ({
        statusCode: HttpResponseCode.SUCCESS_CREATED,
        body
    }),
    onSigned: (body: HttpResponse.Body, cookies: HttpResponse.Cookies[]) => ({
        statusCode: HttpResponseCode.SUCCESS,
        body,
        cookies
    }),
    onDeleted: () => ({
        statusCode: HttpResponseCode.SUCCESS_NO_CONTENT,
    })
};