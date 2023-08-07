    $(document).ready(function() {
      // array for all Events
      let calendarEventsArray=[
        {
          name: "تقديم الجامعات",
          badge: "02/13 - 02/15", // Event badge (optional)
          date: ["July/15/2023", "July/19/2023"], // Date range
          description: "يتم فتح باب التقديم للجامعات في الرياض", // Event description (optional)
          type: "event",
          color: "#d91e18 " 
        },
        {
          name: "التحويل بين الكليات والأقسام",
          date: ["July/30/2023", "August/4/2023"], // Date range
          description: "التحويل بين الكليات والأقسام، وإعادة القيد للمنتظمين غير المستجدين (عبر الخدمات الذاتية)", // Event description (optional)
          type: "event",
          color: "#d91e28 " 
        },
        {
          name: "تأجيل القبول",
          date: ["August/6/2023", "August/21/2023"], // Date range
          description: "تأجيل القبول (في برامج الدراسات العليا)", // Event description (optional)
          type: "event",
          color: "#d91e38 " 
        },
       
      ]
      // Add 25 day for all months
      let months= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      for(let i in months){
        let temp=  {
          id: '09nk7Ts'+i,//not important
          name: "المكافأة الجامعية",
          date: [`${months[i]}/25/2023`],
          type: "مكافأة",
          color: "#091e18 ", // Event custom color (optional)
          }
          calendarEventsArray.push(temp)
      }
      // Main Function
        $('#calendar').evoCalendar({
            //add events here
            language:'en',
            firstDayOfWeek:6,
            calendarEvents: calendarEventsArray
        })     
    })
    