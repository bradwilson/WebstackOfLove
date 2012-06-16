using SignalR.Hubs;

namespace WebstackOfLove.Hubs
{
    // This hub has no inbound APIs, since all inbound communication is done
    // via the HTTP API. It's here for clients which want to get continuous
    // notification of changes to the ToDo database.
    [HubName("todo")]
    public class ToDoHub : Hub { }
}
