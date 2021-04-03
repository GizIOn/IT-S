using System;
using System.Linq;
using System.Text;

namespace RefactoringWhile
{
    public class Reverser
    {
        public StringBuilder reversedStr { get; }
        public bool IsReversable { get; }
        
        public Reverser(){}

        public Reverser(string strToReverse)
        {
            reversedStr = new StringBuilder();
            IsReversable = true;
            if (strToReverse == "null") IsReversable = false;
            var str = strToReverse.Reverse();
            foreach (var c in str) reversedStr.Append(c.ToString());
        }

        public void ReverserGoBrrr()
        {
            while (true)
            {
                var reverser = new Reverser(Console.ReadLine());
                if (reverser.IsReversable) Console.WriteLine(reverser.reversedStr);
                else break;
            }
        }
    }
}