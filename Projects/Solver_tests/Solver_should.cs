using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Solver;

namespace TestProject1
{
    [TestClass]
    public class UnitTest1
    {
        void TestEquation(double a, double b, double c, params double[] expectedResult)
        {
            var result = QuadratucEquationSolver.QuadraticRoot(a, b, c);
            Assert.AreEqual(expectedResult.Length, result.Length);

            for (int i = 0; i < result.Length; i++)
            {
                Assert.AreEqual(expectedResult[i], result[i]);
            }
        }

        [TestMethod]
        public void OrdinaryEquation()
        {
            TestEquation(1,-3,2, 2,1);
        }

        [TestMethod]
        public void NegativeD()
        {
            TestEquation(1,1,1);
        }

        [TestMethod]
        public void NullD()
        {
            TestEquation(1,2,1, -1);
        }

        [TestMethod]
        
        public void FuctionalTest()
        {
            for (var i = 0; i < 100; i++)
            {
                var rnd = new Random();
                var a = rnd.NextDouble() * 10;
                var b = rnd.NextDouble() * 10;
                var c = rnd.NextDouble() * 10;
                var result = QuadratucEquationSolver.QuadraticRoot(a, b, c);
                foreach (var x in result)
                {
                    Assert.AreEqual(0, a * x * x + b * x + c, 1e-10);
                }
            }
        }

        /*[TestMethod]
        public void OrdinaryEquation()
        {
            // Assign
            var a = 1;
            var b = -3;
            var c = 2;
            // Act
            var result = QuadratucEquationSolver.QuadraticRoot(a, b, c);
            // Assert
            Assert.AreEqual(2, result.Length);
            Assert.AreEqual(2, result[0]);
            Assert.AreEqual(1, result[1]);
        }
        
        [TestMethod]
        public void NegativeD()
        {
            // Assign
            var a = 1;
            var b = 1;
            var c = 1;
            // Act
            var result = QuadratucEquationSolver.QuadraticRoot(a, b, c);
            // Assert
            Assert.AreEqual(0, result.Length);
            /*Assert.AreEqual(2, result[0]);
            Assert.AreEqual(1, result[1]);#1#
        }*/
    }
}