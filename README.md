Home | Explore | Add API | About | My Account

### Design for Homepage
### Onboarding Apis
This would be like form with

example
API Provider: Facebook
Icon: facebookIcon.png

Endpoint
Description: A full sentence explaining what the API does.
URL: http://www.facebook.com/photo/234233/
Method: Get, Post, Put, Delete (dropdown)
Params: photoId
Returns: url to facebook photo

Add Another Endpoint

var flow = new Flow()
flow.add(token)
flow.add(endpoint) // returns pic
flow.add(endpoint) // take in pic

var endpoint1 = new Endpoint(token, [parm1Type], url, return);
var endpoint2 = new Endpoint(token, [], url, return);
var endpoint3 = new Endpoint(token, [paramText], url, return);
endpoint3.fullfillParam(endpoint1.fullfillParam(endpoint2))

var facebook = new Endpoint();
var dropbox = new Endpoint();
var emailReciept = new Endpoint();

emailReceipt.fullfill(dropbox.fullfill(facebook()))




<!-- endpoint1.fullfillParam(endpoint3) -->



### Create Flow Textbox
var textbox = new TextBox();
var term = textbox.registerTerm
term.addSuggestion(suggestWhenTextIncudes, suggestionHTML, suggesitionClick(){
    term.surrond(beforeText, afterText)

    OR

    user.oauth(term)
});


### How to recommend / explor apis
You should be able to look at a site and see relevant API's flows.
The homepage should have some recommendations, hoepfully colorful.

A row of Apis
    rating : icon > icon > icon plain text add this zp

### Pricing Page
monetize:
limit of free calls - to get creative flows from driven developers
limited to get the money from the companies/devs who use ALOT of calls

slower? extra endpoint..?

### My Account
remembers authenticated / not authenicated api
user statistics - flow executions, added to apps,  community and single user

### APIS from sposors we should use

Macys (2500)
Expedia ($$)
Full Contact (might be good for profiles, $2500)
Spark Posts (10000)

Saber
Gun
Connect
Nordstrum
UX/Visual Design

Best Buy ($450 for students)
Coinbase ($10000)
