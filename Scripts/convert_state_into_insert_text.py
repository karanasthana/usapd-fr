import pandas as pd

def main():
    state_data = pd.read_csv("/Users/karanasthana/Personal/usapd-fr/state-table-final.csv")
    
    state_text = '/Users/karanasthana/Personal/usapd-fr/Scripts/state_sql.txt'
    
    createTextFile(state_data, state_text)

def createTextFile(input_file, output_file):
    output_file_opened = open(output_file, 'a+')

    for ndx, row in input_file.iterrows():
        s = ''
        s = 'INSERT INTO STATE VALUES ('
        for key, val in enumerate(row):
            # if string values, need to wrap with ' 
            if key in [1]: 
                s = s + "'" + str(val) + "',"
            else:
                s = s + str(val) + ','
        
        s = s[:-1] + ');'
        # s[:-1] to remove the extra comma at the end.

        output_file_opened.write(s + '\n')

main()