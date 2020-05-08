const express = require('express');
const router = express.Router();

const SPECIAL_NAMES = ['optimus prime', 'predaking'];

router.post('/victor', async (req, resp, next) => {
    // console.log(`Have request: ${JSON.stringify(req.body)}`);
    /*
       Important assumption:

       Please note, that typically we would want to take care here to validate the structure and content of the
       inputs and respond with appropriate (400 bad request) error code if they are invalid.  Even if the inputs have
       already been validated on the UI side (as is the case with our UI), we would still want to validate them here
       as well as we cannot safely assume that our UI is the only caller of this service (now or in the future).
       However, this has been omitted for brevity sake as such code is rather mundane and not particularly illustrative
       to the problem at hand nor demonstrating anything key about the assignment.  I hope that such an assumption is
       acceptable in this case.  Therefore, for our purposes moving forward, we will assume and rely upon the assumption
       that the input is indeed valid.
     */

    const autobot = req.body.autobot;
    const decepticon = req.body.decepticon;

    /*
       Important assumption:

       Please note, that typically it is important to ensure that the calculations and operations included here are
       of an non-blocking and/or asynchronous nature (in order to avoid adverse implications to the Node event
       processing loop which would have adverse performance and scalability considerations).  This is typically
       accomplished by using async functions and/or callbacks to accomplish this.  However, as the calculations and
       operations required by this exercise are of a relatively trivial nature, they are negligible and are shown
       mostly as inline for simplicity sake.  For example purposes, the invocation to the getOverallRating() function
       is shown as a simple example of one manner by which such would be accomplished.
     */

    // Important assumption: I am making the name comparison case-insensitive to allow for unpredictable end-user input.
    // I hope that this is acceptable.
    if (SPECIAL_NAMES.indexOf(autobot.name.toLowerCase()) >= 0) {
        resp.status(200).json({
            winner: 'A'
        });
        return;
    }
    if (SPECIAL_NAMES.indexOf(decepticon.name.toLowerCase()) >= 0) {
        resp.status(200).json({
            winner: 'D'
        });
        return;
    }

    const courageDelta = Math.abs(autobot.courage - decepticon.courage);
    const strengthDelta = Math.abs(autobot.strength - decepticon.strength);
    const skillDelta = Math.abs(autobot.skill - decepticon.skill);

    let winner;
    if (courageDelta >= 4 && strengthDelta >= 0) {
        winner = autobot.courage > decepticon.courage ? 'A' : 'D';
        console.log(`winner ${winner === 'A' ? 'autobot' : 'decepticon'} ${winner === 'A' ? autobot.name : decepticon.name} - opponent ran away`);
    } else if (skillDelta >= 3) {
        winner = autobot.skill > decepticon.skill ? 'A' : 'D';
        console.log(`winner ${winner === 'A' ? 'autobot' : 'decepticon'} ${winner === 'A' ? autobot.name : decepticon.name} - skill default`);
    } else {
        const autobotRating = await getOverallRating(autobot);
        const decepticonRating = await getOverallRating(decepticon);

        if (Math.abs(autobotRating - decepticonRating) > 0) {
            winner = autobotRating > decepticonRating ? 'A' : 'D';
            console.log(`winner ${winner === 'A' ? 'autobot' : 'decepticon'} ${winner === 'A' ? autobot.name : decepticon.name} 
                         rating: ${winner === 'A' ? autobotRating : decepticonRating} - (vs ${winner === 'A' ? decepticonRating : autobotRating})`);
        } else {
            // tie
            winner = 'T';
            console.log(`tie autobot rating: ${autobotRating} - (vs decepticonRating: ${decepticonRating})`);
        }
    }

    resp.status(200).json({
        winner: winner
    });
});

const getOverallRating = async (fighter) => {
    return fighter.strength + fighter.intelligence + fighter.speed + fighter.endurance + fighter.firepower;
}

module.exports = router;
