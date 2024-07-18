import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, finalize, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toaster = inject(ToastrService);
  const loader = inject(LoaderService);
  loader.showLoader();
  return next(req).pipe(
    catchError((err:HttpErrorResponse) => {
      switch (err.status) {
        case 404:
            toaster.error(err.message , `${err.status}`)
          break;
        case 500:
            toaster.error(err.message , `${err.status}`)
          break;
        case 401:
          toaster.error(err.message , `${err.status}`)
          break;
        case 400:
          toaster.error(err.message, `${err.status}`)
          break;
        default:
          break;
      }
      return throwError(() => err);
    }),
    finalize(()=> loader.hideLoader())
  )
};
