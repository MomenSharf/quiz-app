
# Special Pusher Events in Presence and Private Channels

### 1. **pusher:subscription_succeeded**
   - **Triggered when**: A client successfully subscribes to a channel (specifically, presence or private channels).
   - **What it does**: 
     - For **presence channels**, it provides a list of all current members in the channel and their details (such as `user_id` and additional user info).
     - It's useful for initializing the user list or count when a user joins a room.
   - **Example**:
     ```js
     channel.bind('pusher:subscription_succeeded', (members) => {
       console.log('Subscription succeeded, current members:', members.count);
     });
     ```

### 2. **pusher:member_added**
   - **Triggered when**: A new member joins a presence channel.
   - **What it does**: 
     - Provides information about the new member (like their `user_id` and other details).
     - Useful for updating the user list or notifying when a new user joins the room.
   - **Example**:
     ```js
     channel.bind('pusher:member_added', (member) => {
       console.log('A new member joined:', member.id);
     });
     ```

### 3. **pusher:member_removed**
   - **Triggered when**: A member leaves or disconnects from a presence channel.
   - **What it does**: 
     - Provides information about the member who left (such as their `user_id`).
     - Useful for updating the user list or notifying when someone leaves the room.
   - **Example**:
     ```js
     channel.bind('pusher:member_removed', (member) => {
       console.log('A member left:', member.id);
     });
     ```

### 4. **pusher:connection_established**
   - **Triggered when**: The Pusher client successfully connects to the Pusher service.
   - **What it does**: 
     - Confirms that the client has connected to Pusher and can now subscribe to channels.
     - Provides the `socket_id`, which is required for certain actions like authenticating private or presence channels.
   - **Example**:
     ```js
     pusher.connection.bind('connected', () => {
       console.log('Pusher connection established:', pusher.connection.socket_id);
     });
     ```

### 5. **pusher:connection_disconnected**
   - **Triggered when**: The Pusher client gets disconnected from the Pusher service.
   - **What it does**: 
     - Indicates that the client has lost its connection to Pusher, usually due to network issues.
     - Useful for handling reconnections or notifying users about disconnection.
   - **Example**:
     ```js
     pusher.connection.bind('disconnected', () => {
       console.log('Pusher connection disconnected');
     });
     ```
