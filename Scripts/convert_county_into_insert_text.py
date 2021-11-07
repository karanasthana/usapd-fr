import pandas as pd

def main():
    county_data = pd.read_csv("/Users/karanasthana/Personal/usapd-fr/county-table-final.csv")
    
    county_text = '/Users/karanasthana/Personal/usapd-fr/Scripts/county_sql.txt'
    
    createTextFile(county_data, county_text)

def createTextFile(input_file, output_file):
    # input_file = input_file[1:]
    output_file_opened = open(output_file, 'a+')

    for ndx, row in input_file.iterrows():
        s = ''
        s = 'INSERT INTO COUNTY VALUES ('
        for key, val in enumerate(row):
            if key in []:
                s = s + "'" + str(val) + "',"
            else:
                s = s + str(val) + ','
        
        s = s[:-1] + ');'
        output_file_opened.write(s + '\n')

main()