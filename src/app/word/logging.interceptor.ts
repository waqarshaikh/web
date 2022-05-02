
import { WordService } from './word.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { finalize, Observable, tap } from "rxjs";

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  constructor(private wordService: WordService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const start = Date.now();
    let ok: string;

    return next.handle(req).pipe(
      tap({
        next: (event) => (ok = event instanceof HttpResponse ? 'succeeded' : ''),
        error: (error) => (ok = 'failed')
      }),
      finalize(()=> {
        const end = Date.now() - start;
        this.wordService.message.next(`${req.method} "${req.urlWithParams}"
        ${ok} in ${end} ms.`)
      })
    )
  }

}
