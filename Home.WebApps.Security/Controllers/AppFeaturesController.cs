using Home.Common.Model;
using Home.Graph.Common;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading;

namespace Home.WebApps.Security.Controllers
{
    [Route("api")]
    [ApiController]
    public class AppFeaturesController : ControllerBase
    {
        public class UserPresent
        {
            public string UserId { get; set; }
            public string UserFirstName { get; set; }
            public string UserName { get; set; }
            public string ImageUrl { get; set; }

            public static UserPresent From(User user)
            {
                var ret = new UserPresent()
                {
                    UserId = user.Id,
                    UserFirstName = user.FirstName,
                    UserName = user.Name,
                    ImageUrl = user.Avatar?.UrlSquareSmall
                };

                if (ret.UserFirstName == null && user.CommonName != null)
                    ret.UserFirstName = user.CommonName;

                if (user.IsGuest)
                    ret.UserName = "GUEST";

                return ret;
            }
        }

        public class Presence
        {
            public List<UserPresent> MainUsers { get; set; }
            public List<UserPresent> Guests { get; set; }
            public bool PrivacyModeActivated { get; set; }
        }

        [Route("presence"), HttpGet]
        public Presence GetPresence()
        {
            Presence presence = new Presence();
            List<User> lst = new List<User>();
            using (var cli = new MainApiDeviceWebClient(Program._deviceId))
            //using (var cli = new MainApiDeviceWebClient(Request.Headers["manoir-device-id"].FirstOrDefault()))
            {
                lst = cli.DownloadData<List<User>>("v1.0/users/presence/mesh/local/all");
                presence.PrivacyModeActivated = cli.DownloadData<bool>("v1.0/system/mesh/local/privacymode/isenabled");
            }
            if (lst != null)
            {
                presence.MainUsers = (from z in lst
                                      where z.IsMain
                                      select UserPresent.From(z)).ToList();
                presence.Guests = (from z in lst
                                   where !z.IsMain
                                   select UserPresent.From(z)).ToList();
            }
            return presence;
        }

        [Route("users"), HttpGet]
        public List<User> GetAllUsers()
        {
            List<User> lst = new List<User>();
            using (var cli = new MainApiDeviceWebClient(Request.Headers["manoir-device-id"].FirstOrDefault()))
            {
                lst = cli.DownloadData<List<User>>("v1.0/users/all");
            }

            lst.Sort((a, b) =>
           {
               if (a.IsMain == b.IsMain)
                   return (a.FirstName?.CompareTo(b.FirstName)).GetValueOrDefault(0);
               else if (a.IsMain)
                   return -1;
               else
                   return 1;
           });

            return lst;
        }

        [Route("presence/add/{userId}"), HttpGet]
        public Presence AddUser(string userId)
        {
            using (var cli = new MainApiDeviceWebClient(Request.Headers["manoir-device-id"].FirstOrDefault()))
            {
                bool b = cli.DownloadData<bool>($"v1.0/users/presence/{userId}/forcelocation/3552050b-e59a-4cf6-b67c-5503d7c2ba40/in");
            }
            Thread.Sleep(500);
            return GetPresence();
        }

        [Route("presence/remove/{userId}"), HttpGet]
        public Presence RemoveUser(string userId)
        {
            using (var cli = new MainApiDeviceWebClient(Request.Headers["manoir-device-id"].FirstOrDefault()))
            {
                bool b = cli.DownloadData<bool>($"v1.0/users/presence/{userId}/forcelocation/3552050b-e59a-4cf6-b67c-5503d7c2ba40/out");
            }
            Thread.Sleep(500);
            return GetPresence();
        }

    }
}
