import { ToastrService } from "ngx-toastr";

/**
 * This function performs the specified function in "callback" then returns either a success or error toaster message. Use this upon submitting an object create/edit/delete action via one of the dialogs in the dialogs components folder.
 * @param toastr The toastr service to use for the toastr functions.
 * @param result The result parameter used for the closed dialog results
 * @param callback The function to attempt to call. Usually to create/edit/delete an object.
 * @param successMsg The message to show upon success.
 */
export function handleToastr(toastr: ToastrService, result: any, callback: () => void, successMsg: string) {
    try {
        if (result) {
            callback();
            toastr.success(successMsg);
        }
    } catch (error) {
        toastr.error('There was an error performing this action: ' + error);
    }
}