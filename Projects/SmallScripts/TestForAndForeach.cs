using System;
using System.Collections.Generic;
using BenchmarkDotNet.Attributes;
using BenchmarkDotNet.Running;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace RefactoringWhile
{
    [RankColumn]
    [MemoryDiagnoser]
    public class TestForAndForeach
    {
        private static readonly int[] arr = new int[15000000];
        private static readonly List<int> list = new List<int>(15000000);

        [GlobalSetup]
        public void Setup()
        {
            var rnd = new Random(42);
            for (int i = 0; i < arr.Length; i++)
            {
                arr[i] = rnd.Next();
            }

            for (int i = 0; i < list.Count; i++)
            {
                list[i] = rnd.Next();
            }
        }

        [Benchmark]
        public void ForCopyToArr()
        {
            var arrToCopyTo = new int[150000000];
            for (int i = 0; i < arr.Length; i++)
            {
                arrToCopyTo[i] = arr[i];
            }
        }

        [Benchmark]
        public void ForCopyToList()
        {
            var listToCopyTo = new List<int>(150000000);
            for (int i = 0; i < list.Count; i++)
            {
                listToCopyTo[i] = list[i];
            }
        }

        [Benchmark]
        public void ForeachCopyToArr()
        {
            var arrToCopyTo = new int[150000000];
            var i = 0;
            foreach (var e in arr)
            {
                arrToCopyTo[i++] = e;
            }
        }

        [Benchmark]
        public void ForeachCopyToList()
        {
            var listToCopyTo = new List<int>(150000000);
            var i = 0;
            foreach (var e in list)
            {
                listToCopyTo[i++] = e;
            }
        }
    }

    [TestClass]
    class Test
    {
        static void Tester()
        {
            BenchmarkRunner.Run<TestForAndForeach>();
        }
    }
}