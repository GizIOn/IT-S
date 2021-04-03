using System;
using System.Linq;

namespace Scripts
{
    public static class Homework
    {
        /// <summary>
        /// Recieves string and transopeses it.
        /// </summary>
        public static void TransposeHomework()
        {
            while (true)
            {
                Console.WriteLine("Type your subject: ");
                var ans = '#' + Console.ReadLine() + '\n';
                Console.WriteLine("Type homework you've gotta do: ");
                var str = Console.ReadLine();
                if (str == null)
                {
                    Console.WriteLine("Please, type in string.");
                    continue;
                }

                Console.WriteLine();
                var splitStr = str.Split(',');
                ans = splitStr.Aggregate(ans,
                    (current, line) => current + (line.Equals(splitStr[^1]) ? line : line + ",\n"));

                Console.WriteLine(ans);
                break;
            }
        }
    }
}