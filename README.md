## Task

This is a boilerplate code created by `django-admin` please use python 3.
The goal of this task is to create a little notepad using django REST API
The notepad model is:

`title`: the title of the notepad
`message`: the message text written
`owner`: the creator of the note
`created_at`: when the notes was created
`modified_at`: when the notes were modified

You task is make endpoints available in django rest that allows a user to create, read, update, list and delete the notes. Have error handling endpoints for cases where the note doesn't exist or an internel server error occurs. You should also react a react js application that performs CRUD operations to the database.

This task should take about 4 hours to complete but we understand that you may not have enough time on your hands, You have 3 days to complete the task and if you require extra time please let us know.


BONUS:
These are bonus tasks. Feel free to ignore if you like.
* Lazy-load the react js component data to handle scale in data ingestion
* Implement a method to update the frontend data in intervals or real time (your choice)
* Make create a new note be asyncronous
* Get notes created by a specific user
* make the endpoints accessible though a websocket. hint: `use django-channels`

Don't worry about authentication for the user.

If you have any additional questions please reach out to Okhaifo Oikeh via email at okhaifo@adoyen.com.