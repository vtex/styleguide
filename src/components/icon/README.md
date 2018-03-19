```js
const Check = require('./Check').default;
const Close = require('./Close').default;
const Deny = require('./Deny').default;
const Edit = require('./Edit').default;
const Failure = require('./Failure').default;
const Success = require('./Success').default;
const Warning = require('./Warning').default;
<div className="flex justify-between tl">
    <div>
        <div className="pb3 ttu gray">Close</div>
        <Close width={40} />
    </div>

    <div>
        <div className="pb3 ttu gray">Edit</div>
        <Edit width={40} />
    </div>

    <div>
        <div className="pb3 ttu gray">Check</div>
        <Check width={40} />
    </div>

    <div>
        <div className="pb3 ttu gray">Deny</div>
        <Deny width={40} />
    </div>

    <div>
        <div className="pb3 ttu gray">Failure</div>
        <Failure width={40} />
    </div>

    <div>
        <div className="pb3 ttu gray">Success</div>
        <Success width={40} />
    </div>

    <div>
        <div className="pb3 ttu gray">Warning</div>
        <Warning width={40} />
    </div>
</div>
```