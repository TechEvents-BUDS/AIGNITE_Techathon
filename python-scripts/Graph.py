import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import pandas as pd

# Urban area data
x_urban = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).reshape(-1, 1)
y_urban = np.array([2, 4, 5, 7, 10, 11, 14, 15, 18, 19]).reshape(-1, 1)

# Rural area data
x_rural = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).reshape(-1, 1)
y_rural = np.array([3, 6, 8, 9, 12, 14, 17, 19, 21, 24]).reshape(-1, 1)

# Split data into training and test sets for urban
x_train_urban, x_test_urban, y_train_urban, y_test_urban = train_test_split(
    x_urban, y_urban, test_size=0.2, random_state=0
)

# Split data into training and test sets for rural
x_train_rural, x_test_rural, y_train_rural, y_test_rural = train_test_split(
    x_rural, y_rural, test_size=0.2, random_state=0
)

# Create and train models
model_urban = LinearRegression()
model_urban.fit(x_train_urban, y_train_urban)

model_rural = LinearRegression()
model_rural.fit(x_train_rural, y_train_rural)

# Plot the results for urban area
plt.figure()
plt.scatter(x_urban, y_urban, color='blue', label='Urban data points')
plt.plot(x_urban, model_urban.predict(x_urban), color='red', label='Urban regression line')
plt.xlabel('x')
plt.ylabel('y')
plt.title('Urban Area')
plt.legend()
plt.savefig("./public/assets/urban.png")

# Plot the results for rural area
plt.figure()
plt.scatter(x_rural, y_rural, color='green', label='Rural data points')
plt.plot(x_rural, model_rural.predict(x_rural), color='orange', label='Rural regression line')
plt.xlabel('x')
plt.ylabel('y')
plt.title('Rural Area')
plt.legend()
plt.savefig("./public/assets/rural.png")

# Plot the combined results
plt.figure()
plt.scatter(x_urban, y_urban, color='blue', label='Urban data points')
plt.plot(x_urban, model_urban.predict(x_urban), color='red', label='Urban regression line')

plt.scatter(x_rural, y_rural, color='green', label='Rural data points')
plt.plot(x_rural, model_rural.predict(x_rural), color='orange', label='Rural regression line')

plt.xlabel('x')
plt.ylabel('y')
plt.title('Urban vs Rural Area')
plt.legend()
plt.savefig("./public/assets/combined.png")

