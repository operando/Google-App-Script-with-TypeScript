const calId = "okanoshinobu8@gmail.com";

class PostEvent {
    queryString: string;
    parameter: { [indx: string]: string; };
    parameters: { [indx: string]: [string]; };
    contentLength: number;
    postData: {
        length: number;
        type: string;
        contents: string;
        name: string;
    };
}

function _test() {
    let e = new PostEvent;
    e.postData = {
        length: 0,
        type: "",
        contents: '{"title":"sample title", "startTime": "2017-05-21T09:00:00.000Z", "endTime": "2017-05-21T12:00:00.000Z"}',
        name: ""
    };
    // Logger.log(doPost(e));
    createEvent(createCalenderEvent(e));
}

class CalenderEvent {
    title: string;
    startTime: Date;
    endTime: Date;
}

function doPost(e: PostEvent): GoogleAppsScript.Content.TextOutput {
    let ce = new CalenderEvent;
    let contents = JSON.parse(e.postData.contents);
    ce.title = contents.title;
    ce.startTime = new Date(contents.startTime);
    ce.endTime = new Date(contents.endTime);

    let r = JSON.stringify(ce);
    return ContentService.createTextOutput(r);
}

function createCalenderEvent(e: PostEvent): CalenderEvent {
    let ce = new CalenderEvent;
    let contents = JSON.parse(e.postData.contents);
    ce.title = contents.title;
    ce.startTime = new Date(contents.startTime);
    ce.endTime = new Date(contents.endTime);
    return ce;
}

function createEvent(e: CalenderEvent) {
    CalendarApp.getCalendarById(calId)
        .createEvent(
        e.title,
        e.startTime,
        e.endTime
        );
}