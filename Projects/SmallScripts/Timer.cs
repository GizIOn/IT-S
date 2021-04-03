using System;

namespace Scripts
{
    public static class Timer
    {
        public static void CountTimeForRunAWeek(int weeksToRun)
        {
            var sec = 1800.0;
            for (var week = 0; week < weeksToRun; week++)
            {
                var sec1 = sec % 60;
                var hours = (int) (sec / 3600);
                var min = (int) (sec / 60) - hours * 60;
                WriteResult(hours, week, min, sec1);
                sec *= 110 / 100.0;
            }
        }

        private static void WriteResult(int hours, int week, int min, double sec1)
        {
            if (hours == 1)
                Console.WriteLine("{0} week: {1} hour, {2} minutes, {3} seconds", week, hours, min, (int) sec1);

            else if (hours != 0)
                Console.WriteLine("{0} week: {1} hours, {2} minutes, {3} seconds", week, hours, min, (int) sec1);

            else
                Console.WriteLine("{0} week: {1} minutes, {2} seconds", week, min, (int) sec1);
        }
    }
}