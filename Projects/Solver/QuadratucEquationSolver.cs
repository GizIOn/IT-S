using System;

namespace Solver
{
    public class QuadratucEquationSolver
    {
        public static double[] QuadraticRoot(double a, double b,  double c)
        {
            var d = b * b - 4 * a * c;
            if (d>0)
            {
                var x1 = (-b + Math.Sqrt(d)) / (2 * a);
                var x2 = (-b - Math.Sqrt(d)) / (2 * a);
                return new[] {x1, x2};
            }

            return d == 0 ? new[] {-b / (2 * a)} : new double[0];
        }
    }
}