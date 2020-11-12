osascript -e '
  tell application "System Preferences"
    activate
    reveal anchor "output" of pane id "com.apple.preference.sound"
    delay 3.0
  end tell
'

osascript -e '
  tell application "System Events" to tell process "System Preferences"
    tell table 1 of scroll area 1 of tab group 1 of window 1
      select (row 1 where value of text field 1 is "JDS Labs Element DAC")
    end tell
    tell slider 1 of group 1 of tab group 1 of window 1 to set value to 0.5
    tell slider 0 of window 0 to set value to 0.1
  end tell
'

      # select (row 1 where value of text field 1 is "WH-1000XM2")
      # select (row 1 where value of text field 1 is "JDS Labs Element DAC")
# osascript -e '
#   tell application "System Events" to tell process "System Preferences"
#     tell slider 1 of group 1 of tab group 1 of window 1 to set value to 0.5
#     tell slider 0 of window 0 to set value to 0.1
#   end tell
#   '



# osascript -e '
#   tell process "System Preferences" to tell slider 1 of group 1 of tab group 1 of window 1 to set value to 0.5
#   '
# osascript -e '
#   tell process "System Preferences" to tell slider 0 of window 0 to set value to 0.1
# '