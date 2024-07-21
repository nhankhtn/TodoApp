use chrono::NaiveDateTime;
use serde::{ self, Deserialize, Serializer };
use serde::de::Error as DeError;

const FORMAT: &str = "%Y-%m-%d %H:%M:%S";

pub fn serialize<S>(date: &NaiveDateTime, serializer: S) -> Result<S::Ok, S::Error>
    where S: Serializer
{
    let s = date.format(FORMAT).to_string();
    serializer.serialize_str(&s)
}

pub fn deserialize<'de, D>(deserializer: D) -> Result<NaiveDateTime, D::Error>
    where D: serde::Deserializer<'de>
{
    let s = String::deserialize(deserializer)?;
    NaiveDateTime::parse_from_str(&s, FORMAT).map_err(D::Error::custom)
}
