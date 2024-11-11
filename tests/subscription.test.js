import { Timer } from "./timer.js";
import dotenv from "dotenv";

dotenv.config('./env')

async function test_getUserSubscriptions() {
    const timer = new Timer();
    timer.start();

    for (let index = 0; index < 20; index++) {
        const res1 = await fetch(`http://localhost:${process.env.PORT}/api/v1/subscription/lua/get-user-subscriptions`);
        const data = await res1.json();
        console.log(data);

        if (res1.ok) {
            timer.note("Response is OK.");
        } else {
            timer.note("Response is not OK.");
        }
    }

    timer.stop();
    timer.showElapsedTime();
    timer.showNotes();
}

async function test_isSubscribed() {
    const timer = new Timer();
    timer.start();

    for (let index = 0; index < 20; index++) {
        const res1 = await fetch(`http://localhost:${process.env.PORT}/api/v1/subscription/is-subscribed`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                blogger: "6685bed286c99398b9094ee7"
            })
        });
        const data = await res1.json();
        console.log(data);

        if (res1.ok) {
            timer.note("Response is OK.");
        } else {
            timer.note("Response is not OK.");
        }
    }

    timer.stop();
    timer.showElapsedTime();
    timer.showNotes();
}



// test_getUserSubscriptions();
test_isSubscribed()