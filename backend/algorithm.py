#!/usr/bin/env python3
from numpy import linspace
from numpy.random import uniform
from sympy.parsing.sympy_parser import eval_expr

import numpy
numpy_dict = {a: getattr(numpy, a) for a in dir(numpy)}

def approx(f, a, b, c, d, size):
    xs = uniform(a, b, size)
    ys = uniform(c, d, size)
    area = (d - c) * (b - a)
    under = ys < eval_expr(f, {'xs': xs}, numpy_dict)
    return sum(under) / size * area

if __name__ == '__main__':
    from sys import argv
    f, a, b, c, d = argv[1:6]
    size = int(argv[6]) if len(argv) == 7 else 100
    a, b, c, d = map(int, (a, b, c, d))

    print('integrating {} from {} to {} with {} samples'.format(f, a, b, size))
    result = approx(f, a, b, c, d, size)
    print('approx = {}'.format(result))
