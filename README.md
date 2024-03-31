# LandCrowd

## Overview

LandCrowd revolutionizes the real estate market by enabling the fractional buying and selling of land plots. This innovative platform democratizes land ownership, making it accessible and affordable. By facilitating fractional transactions, LandCrowd opens new investment opportunities and provides liquidity to landowners. It serves buyers, sellers, lawyers, and surveyors, streamlining the transaction process with an intuitive interface and robust backend support.

## Features

- **Fractional Ownership**: Buy or sell fractional interests in land plots.
- **User Profiles**: Custom profiles for buyers, sellers, lawyers, and surveyors, each with tailored functionalities.
- **Transaction Management**: Efficiently manage buying and selling processes, with support for legal and surveying services.


## Getting Started

Follow these instructions to get LandCrowd running on your local machine for development and testing purposes.

### Prerequisites

- Python 3.8 or later
- pip and virtualenv
- Node.js and npm

### Installing

#### Backend Setup

1. **Clone the Project**

   ```sh
   git clone https://github.com/yourgithubusername/landcrowd.git
   cd landcrowd
   ```

2. Set Up a Python Virtual Environment
Windows:
```sh
python -m venv venv
.\venv\Scripts\activate

```

macOS/Linux:

```sh
python3 -m venv venv
source venv/bin/activate
```

3. Install Dependencies
```sh
pip install -r requirements.txt
```

4.Database Migrations

```sh
python manage.py migrate
```

5. Frontend Setup

Navigate to the frontend directory:

'''sh
cd frontend
npm install
npm start

'''

## Usage
Explore LandCrowd's features by registering as a user, lawyer, surveyor or lawyer to lexplore the platforms capabilities.



