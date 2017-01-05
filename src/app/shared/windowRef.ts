import {Injectable} from '@angular/core';

function _window(): any {
    // return the native window obj
    return window;
}

@Injectable()
export class WindowRef {
    wp_info: any;
    get nativeWindow(): any {
        let window = _window();
        return window.wp_info;
    }

}