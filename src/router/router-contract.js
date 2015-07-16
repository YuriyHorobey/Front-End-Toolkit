/**
 * Created by yuriy.horobey on 2015-07-14.
 */

function RouterContract(contract, validator) {

    contract.describe('register', {
            pre:     function (route, handler) {
                if (arguments.length < 2) {
throw new Error();
                }

            }, post: function () {
            }
        }
    )

    /*
     contract.register('', {
     pre:     function () {
     }, post: function () {
     }
     });
     */
}
