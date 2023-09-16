import { EventEmitterEnums, eventEmitter } from "@/eventEmitter";
import { EnqueueSnackbar } from "notistack";

export const emitEnqueueSnackbar: EnqueueSnackbar = (...args) => {
    eventEmitter.emit(EventEmitterEnums.ENQUEUE_SNACKBAR, ...args)
    return 'EventEmitterEnums.ENQUEUE_SNACKBAR'
}

